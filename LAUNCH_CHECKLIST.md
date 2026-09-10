# MUST Cafeteria launch checklist

## Backend and data

- [ ] Existing `must-cafeteria` Supabase project connected
- [ ] `menu_items`, `orders`, `order_items`, and `managers` populated and tested
- [ ] Menu session and section filtering verified
- [ ] Prices and stock validated server-side
- [ ] RLS policies reviewed in Supabase AI and tested before public launch
- [ ] Manager authentication is real, not the demo credential

## Payments

- [ ] Daraja sandbox STK Push succeeds
- [ ] Student receives the PIN prompt
- [ ] Success callback marks the order paid exactly once
- [ ] Failed, cancelled, and timed-out payments never enter the active queue
- [ ] `MPESA_CALLBACK_URL` uses the deployed HTTPS URL
- [ ] Duplicate payment and duplicate callback tests pass

## Operations

- [ ] Paid orders appear first-come-first-served
- [ ] Manager sees name, phone, code, items, total, and paid time
- [ ] Mark Served removes the order from the active queue immediately
- [ ] Completed orders remain in history
- [ ] Availability and quantity-zero controls prevent new checkout items

## Frontend and performance

- [ ] Test 360, 375, 390, 412, tablet, and desktop widths
- [ ] Light and dark themes remain readable
- [ ] Missing food images show the branded fallback, never a broken image
- [ ] Empty cart cannot be checked out
- [ ] Payment button cannot be double-clicked
- [ ] No sensitive order or payment data is cached by the service worker
- [ ] `npm run lint` passes
- [ ] `npm run build` passes

## Partner demo

- [ ] Explain the queue problem and the pre-order/M-Pesa solution
- [ ] Demonstrate a student order from menu to confirmation
- [ ] Demonstrate the manager queue and Mark Served
- [ ] Demonstrate toggling a meal unavailable
- [ ] Present future e-wallet, student testing, cafeteria approval, and manager roles as next phases
