# Deployment

Deploy the Next.js application to Vercel with the standard Next.js preset. Before production, connect Supabase, configure server-side M-Pesa Daraja credentials, add callback routes, and move price/availability validation into trusted server code.

The current build is a safe prototype: simulated payments are visibly labeled and no sensitive payment information is cached by the service worker.
