# MUST Cafeteria

A mobile-first campus food ordering prototype for Meru University of Science and Technology. Students can browse the lunch menu, add meals to a cart, simulate an M-Pesa payment, receive an order code, track status, and demonstrate the management queue.

## Run locally

Install dependencies with your package manager, then use `npm run dev`. The app defaults to prototype mode so the ordering flow works without a backend.

## Architecture notes

The UI is intentionally separated from future data and payment services. Replace the in-memory meals/order state with Supabase queries and server-side payment routes when the backend is connected. Never trust client-side prices or payment success in production.

## PWA

The app includes a manifest, branded icon, and a conservative service worker that caches only the app shell and GET requests. Order and payment routes are excluded from caching.
