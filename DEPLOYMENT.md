# MUST Cafeteria deployment

## Vercel

1. Push the `v0/must-cafeteria-build` branch to GitHub and open the project in Vercel.
2. Import it as a Next.js application with the repository root as the project root.
3. Add the Supabase public URL and publishable/anon key, plus the server-only Supabase service-role key.
4. Add `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` only if the chosen manager auth implementation uses Better Auth. Set the URL to the final Vercel URL.
5. Add the server-only Daraja values: `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`, `MPESA_PASSKEY`, and `MPESA_CALLBACK_URL`.
6. Set `MPESA_CALLBACK_URL` to `https://your-vercel-domain.vercel.app/api/mpesa/callback`.
7. Deploy a preview first and verify checkout, callback, manager queue, and mobile layouts before promoting it.

## Before production

The current frontend has a safe local fallback for demonstration. Connect the existing Supabase project through server routes before launch. Prices, availability, quantities, payment state, and manager actions must be validated server-side; never trust browser totals or expose a service-role/Daraja secret to a client component.

## Daraja verification

Use sandbox credentials first. A successful STK initiation is not a paid order: the callback must be verified and idempotently update the order before it appears in the serving queue. Configure the callback URL on the deployed environment and test cancelled, timed-out, duplicate, and successful callbacks.
