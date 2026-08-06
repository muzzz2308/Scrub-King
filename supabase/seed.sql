-- Seed catalog from static storefront data
-- Run after 001_initial_schema.sql

INSERT INTO products (slug, name, tagline, price, compare_at, image_url, accent, blurb, perks, specs)
VALUES
  (
    'scrub-king',
    'Scrub King',
    'Dual-Texture Scrubber',
    199,
    249,
    '/Kingimg.webp',
    'king',
    'Soft in warm water, firm in cool water. The shape-shifting scrubber that reads the room and never scratches your pans.',
    '["Scratch free on every surface", "Resists odors for weeks", "Rinses clean in seconds"]'::jsonb,
    '[{"label": "Texture", "value": "Soft / Firm"}, {"label": "Best for", "value": "Pots, pans, glass"}]'::jsonb
  ),
  (
    'scrub-queen',
    'Scrub Queen',
    'Dual-Sided Scrubber + Sponge',
    199,
    249,
    '/Queenimg.webp',
    'queen',
    'Scrubber on one side, super-soft absorbent sponge on the other. One flip and the whole counter is spotless.',
    '["Super soft & absorbent", "Scratch free & resists odors", "Two tools in one flip"]'::jsonb,
    '[{"label": "Texture", "value": "Scrub / Sponge"}, {"label": "Best for", "value": "Counters, sinks, dishes"}]'::jsonb
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  price = EXCLUDED.price,
  compare_at = EXCLUDED.compare_at,
  image_url = EXCLUDED.image_url,
  accent = EXCLUDED.accent,
  blurb = EXCLUDED.blurb,
  perks = EXCLUDED.perks,
  specs = EXCLUDED.specs,
  updated_at = now();

INSERT INTO packs (id, name, subtitle, price, pieces, contents, belongs_to, badge)
VALUES
  ('king-1', 'Scrub King · Single', '1 × Scrub King', 199, 1, '["scrub-king"]'::jsonb, 'scrub-king', NULL),
  ('queen-1', 'Scrub Queen · Single', '1 × Scrub Queen', 199, 1, '["scrub-queen"]'::jsonb, 'scrub-queen', NULL),
  ('duo', 'The Duo', '1 × King + 1 × Queen', 375, 2, '["scrub-king", "scrub-queen"]'::jsonb, 'mix', 'Best starter'),
  ('family-4', 'Family Pack of 4', '2 × King + 2 × Queen', 719, 4, '["scrub-king", "scrub-queen", "scrub-king", "scrub-queen"]'::jsonb, 'mix', 'Most popular'),
  ('king-3', 'Pack of 3 · Scrub King', '3 × Scrub King', 549, 3, '["scrub-king"]'::jsonb, 'scrub-king', 'Best value'),
  ('queen-3', 'Pack of 3 · Scrub Queen', '3 × Scrub Queen', 549, 3, '["scrub-queen"]'::jsonb, 'scrub-queen', 'Best value'),
  ('king-5', 'Pack of 5 · Scrub King', '5 × Scrub King', 899, 5, '["scrub-king"]'::jsonb, 'scrub-king', 'Best value'),
  ('queen-5', 'Pack of 5 · Scrub Queen', '5 × Scrub Queen', 899, 5, '["scrub-queen"]'::jsonb, 'scrub-queen', 'Best value')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  price = EXCLUDED.price,
  pieces = EXCLUDED.pieces,
  contents = EXCLUDED.contents,
  belongs_to = EXCLUDED.belongs_to,
  badge = EXCLUDED.badge,
  updated_at = now();

DELETE FROM packs WHERE id IN ('trio');
