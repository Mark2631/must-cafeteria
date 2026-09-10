# Authentication setup

Prototype mode does not require customer accounts. When Supabase is connected, use Supabase Auth for management access and optional Google sign-in for students. Return users to the checkout or previous action after authentication and keep the cart in client state.

Never expose a Supabase service-role key in browser code. Protect management routes server-side and scope customer order lookups by order code plus phone number.
