-- Order auto-purge and persistent revenue tracking

ALTER TABLE orders ADD COLUMN IF NOT EXISTS purge_after TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS revenue_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE,
  order_number TEXT NOT NULL,
  total INTEGER NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE revenue_ledger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read revenue"
  ON revenue_ledger FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin insert revenue"
  ON revenue_ledger FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION set_order_purge_after()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'cancelled' AND (OLD.status IS DISTINCT FROM 'cancelled') THEN
    NEW.purge_after = now() + interval '6 hours';
  ELSIF NEW.status = 'delivered' AND (OLD.status IS DISTINCT FROM 'delivered') THEN
    NEW.purge_after = now() + interval '1 day';
    INSERT INTO revenue_ledger (order_id, order_number, total)
    VALUES (NEW.id, NEW.order_number, NEW.total)
    ON CONFLICT (order_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_set_purge_after ON orders;

CREATE TRIGGER orders_set_purge_after
  BEFORE UPDATE OF status ON orders
  FOR EACH ROW EXECUTE FUNCTION set_order_purge_after();

CREATE OR REPLACE FUNCTION purge_expired_orders()
RETURNS void AS $$
BEGIN
  DELETE FROM orders
  WHERE purge_after IS NOT NULL AND purge_after <= now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION purge_expired_orders() TO authenticated;
