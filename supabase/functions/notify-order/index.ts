import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function formatPkr(n: number) {
  return `Rs ${n.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return new Response(JSON.stringify({ error: "orderId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const notifyEmail = Deno.env.get("NOTIFY_EMAIL");

    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: order, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const items = (order.order_items ?? [])
      .map(
        (item: { pack_name: string; qty: number; unit_price: number }) =>
          `- ${item.pack_name} × ${item.qty} (${formatPkr(item.unit_price * item.qty)})`,
      )
      .join("\n");

    const body = [
      `New COD order: ${order.order_number}`,
      "",
      `Customer: ${order.customer_name}`,
      `Phone: ${order.phone}`,
      order.email ? `Email: ${order.email}` : null,
      `Address: ${order.address}, ${order.city}${order.zip ? ` ${order.zip}` : ""}`,
      order.notes ? `Notes: ${order.notes}` : null,
      "",
      "Items:",
      items,
      "",
      `Subtotal: ${formatPkr(order.subtotal)}`,
      `Shipping: ${order.shipping === 0 ? "Free" : formatPkr(order.shipping)}`,
      `COD fee: ${formatPkr(order.cod_fee)}`,
      `Total: ${formatPkr(order.total)}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (resendKey && notifyEmail) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: Deno.env.get("NOTIFY_FROM") ?? "Scrub Squad <onboarding@resend.dev>",
          to: [notifyEmail],
          subject: `New order ${order.order_number}`,
          text: body,
        }),
      });

      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Resend failed: ${detail}`);
      }
    } else {
      console.log(body);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
