# MUST Cafeteria backend handoff

The frontend is intentionally integration-ready and currently uses local development state so the student ordering and management flows can be demonstrated safely. Connect the existing `must-cafeteria` Supabase project through server routes before public launch; never put a service-role key in a client component.

## Required server boundaries

- `POST /api/orders/initiate-payment`: validate menu IDs, session, section, quantities, availability, and recompute totals from the database before initiating Daraja.
- `POST /api/mpesa/callback`: verify the callback, update payment/order state idempotently, and only then expose the order to management.
- `GET /api/menu?session=&section=`: return only active items for the requested session and section.
- `GET /api/admin/orders`: authenticated manager route; return today’s paid, unserved orders first-come-first-served.
- `PATCH /api/admin/orders/[id]/serve`: authenticated manager route; atomically mark a paid order served.
- `PATCH /api/admin/menu/[id]`: authenticated manager route for availability and quantity changes.

## Supabase checklist

Tables are expected to be `menu_items`, `orders`, `order_items`, and `managers`. Add indexes for menu session/section/available and order status/paid_at. Review and enable RLS policies in Supabase AI before launch; do not enable policies blindly without testing manager access and customer menu reads.

The frontend demo credential is `manager@must.ac.ke` / `MUST2026!`. Replace it with a real manager-auth flow before production. No customer login is required.

## Daraja contract

Keep Daraja credentials server-only. The UI already models `ready`, `initiating`, `waiting for M-Pesa PIN`, `payment confirmed`, and `payment failed`; connect those states to the STK Push request and verified callback rather than treating a browser response as proof of payment. Use an idempotency key for every checkout attempt and reject duplicate callback updates.

## Environment

Use the project’s Supabase and Daraja environment variables in Vercel. Never commit `.env.local`, service-role keys, Daraja secrets, or callback credentials.
