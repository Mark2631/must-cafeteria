'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
  import { ArrowRight, Check, CircleHelp, Clock3, LockKeyhole, Menu, Moon, Minus, Plus, Search, ShoppingBag, Sun, Ticket, Utensils, X } from 'lucide-react'

type Session = 'Breakfast' | 'Lunch' | 'Supper'
type MealType = 'Student Meals' | 'Premium Dining'
type Section = 'A' | 'B'
type Meal = { id: string; name: string; description: string; price: number; category: string; type: MealType; sessions: Session[]; section: Section; image: string; available: boolean; stock?: number }
type CartItem = Meal & { quantity: number }
type Order = { code: string; name: string; phone: string; total: number; status: 'Paid' | 'Ready' | 'Served'; items: CartItem[]; createdAt: string }

const meals: Meal[] = [
  { id: 'a-tea', name: 'Tea', description: 'Hot Kenyan tea', price: 10, category: 'Breakfast', type: 'Student Meals', sessions: ['Breakfast'], section: 'A', image: '/foods/tea.png', available: true },
  { id: 'a-mandazi', name: 'Mandazi', description: 'Fresh campus breakfast pastry', price: 10, category: 'Breakfast', type: 'Student Meals', sessions: ['Breakfast'], section: 'A', image: '/foods/mandazi.png', available: true },
  { id: 'a-ngumu', name: 'Ngumu / Kaimati', description: 'Small sweet fried bites', price: 5, category: 'Breakfast', type: 'Student Meals', sessions: ['Breakfast'], section: 'A', image: '/foods/ngumu.png', available: true },
  { id: 'a-bread', name: 'Bread', description: 'Sliced bread portion', price: 10, category: 'Breakfast', type: 'Student Meals', sessions: ['Breakfast'], section: 'A', image: '/foods/bread.png', available: true },
  { id: 'a-chapati-breakfast', name: 'Chapati', description: 'Soft hand-cooked chapati', price: 15, category: 'Breakfast', type: 'Student Meals', sessions: ['Breakfast'], section: 'A', image: '/foods/chapati.png', available: true },
  { id: 'a-egg', name: 'Boiled Egg', description: 'Boiled egg portion', price: 20, category: 'Breakfast', type: 'Student Meals', sessions: ['Breakfast'], section: 'A', image: '/foods/boiled-egg.png', available: true },
  { id: 'a-rice', name: 'Rice', description: 'Steamed rice portion', price: 20, category: 'Staples', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/rice.png', available: true },
  { id: 'a-ugali', name: 'Ugali', description: 'Traditional maize meal portion', price: 10, category: 'Staples', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/ugali-sukuma.png', available: true },
  { id: 'a-githeri', name: 'Githeri', description: 'Maize and beans, lightly seasoned', price: 25, category: 'Plates', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/githeri.png', available: true },
  { id: 'a-ndengu', name: 'Ndengu Stew', description: 'Green grams in a homestyle stew', price: 15, category: 'Stews', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/ndengu.png', available: true },
  { id: 'a-beans', name: 'Beans Stew', description: 'Slow-cooked beans in tomato stew', price: 15, category: 'Stews', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/beans.png', available: true },
  { id: 'a-chapati', name: 'Chapati', description: 'Soft hand-cooked chapati', price: 15, category: 'Staples', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/chapati.png', available: true },
  { id: 'a-greens', name: 'Cabbage / Sukuma Wiki', description: 'Fresh seasonal greens', price: 10, category: 'Vegetables', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/ugali-sukuma.png', available: true },
  { id: 'a-beef', name: 'Beef Stew', description: 'Beef in a rich tomato stew', price: 30, category: 'Stews', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/beef-stew.png', available: true },
  { id: 'a-ugali-sukuma', name: 'Ugali + Sukuma', description: 'Ugali served with fresh greens', price: 20, category: 'Plates', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/ugali-sukuma.png', available: true },
  { id: 'a-rice-beans', name: 'Rice + Beans', description: 'Rice served with beans stew', price: 35, category: 'Plates', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/rice-beans.png', available: true },
  { id: 'a-chapati-beans', name: 'Chapati + Beans', description: 'Chapati served with beans stew', price: 30, category: 'Plates', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/chapati.png', available: true },
  { id: 'a-rice-ndengu', name: 'Rice + Ndengu', description: 'Rice served with green gram stew', price: 35, category: 'Plates', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/ndengu.png', available: true },
  { id: 'a-ugali-beef', name: 'Ugali + Beef Stew', description: 'Ugali served with beef stew', price: 40, category: 'Plates', type: 'Student Meals', sessions: ['Lunch', 'Supper'], section: 'A', image: '/foods/beef-stew.png', available: true },
  { id: 'b-tea', name: 'Tea', description: 'Hot Kenyan tea', price: 20, category: 'Breakfast', type: 'Premium Dining', sessions: ['Breakfast'], section: 'B', image: '/foods/tea.png', available: true },
  { id: 'b-chapati-breakfast', name: 'Chapati', description: 'Soft hand-cooked chapati', price: 20, category: 'Breakfast', type: 'Premium Dining', sessions: ['Breakfast'], section: 'B', image: '/foods/chapati.png', available: true },
  { id: 'b-full-breakfast', name: 'Full Breakfast Plate', description: 'A generous breakfast plate', price: 100, category: 'Breakfast', type: 'Premium Dining', sessions: ['Breakfast'], section: 'B', image: '/foods/full-breakfast.png', available: true },
  { id: 'b-pilau', name: 'Pilau', description: 'Fragrant spiced rice', price: 70, category: 'Premium Dining', type: 'Premium Dining', sessions: ['Lunch', 'Supper'], section: 'B', image: '/foods/pilau.png', available: true },
  { id: 'b-beef-rice', name: 'Beef + Rice', description: 'Beef stew served with rice', price: 100, category: 'Premium Dining', type: 'Premium Dining', sessions: ['Lunch', 'Supper'], section: 'B', image: '/foods/beef-stew.png', available: true },
  { id: 'b-beef-chapati', name: 'Beef + Chapati', description: 'Beef stew served with chapati', price: 110, category: 'Premium Dining', type: 'Premium Dining', sessions: ['Lunch', 'Supper'], section: 'B', image: '/foods/beef-stew.png', available: true },
  { id: 'b-chicken-rice', name: 'Chicken + Rice', description: 'Chicken served with rice', price: 150, category: 'Premium Dining', type: 'Premium Dining', sessions: ['Lunch', 'Supper'], section: 'B', image: '/foods/chicken-rice.png', available: true },
  { id: 'b-fish-ugali', name: 'Fish + Ugali', description: 'Fish served with ugali', price: 160, category: 'Premium Dining', type: 'Premium Dining', sessions: ['Lunch', 'Supper'], section: 'B', image: '/foods/fish-ugali.png', available: true },
  { id: 'b-liver-rice', name: 'Liver + Rice', description: 'Liver stew served with rice', price: 130, category: 'Premium Dining', type: 'Premium Dining', sessions: ['Lunch', 'Supper'], section: 'B', image: '/foods/liver-rice.png', available: true },
]

const sessionOrder: Session[] = ['Breakfast', 'Lunch', 'Supper']
const serviceWindows: Record<Session, { start: number; end: number; label: string }> = {
  Breakfast: { start: 7 * 60, end: 10 * 60, label: '7:00 AM – 10:00 AM' },
  Lunch: { start: 12 * 60, end: 14 * 60, label: '12:00 PM – 2:00 PM' },
  Supper: { start: 18 * 60, end: 20 * 60, label: '6:00 PM – 8:00 PM' },
}
const money = (value: number) => `KES ${value.toLocaleString()}`
function getServiceState(date = new Date()) {
  const minutes = date.getHours() * 60 + date.getMinutes()
  const active = sessionOrder.find((item) => minutes >= serviceWindows[item].start && minutes < serviceWindows[item].end)
  const next = sessionOrder.find((item) => minutes < serviceWindows[item].start) ?? 'Breakfast'
  return { active, next, minutes }
}

function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatClock(date: Date) {
  return new Intl.DateTimeFormat('en-KE', { hour: 'numeric', minute: '2-digit', second: '2-digit' }).format(date)
}

function FoodImage({ src, alt, compact = false }: { src: string; alt: string; compact?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={compact ? 'food-placeholder compact' : 'food-placeholder'} role="img" aria-label={`${alt} image unavailable`}><Utensils /></div>
  return <Image src={src} alt={alt} width={900} height={600} className="food-photo" loading={compact ? 'eager' : 'lazy'} onError={() => setFailed(true)} />
}

export default function Home() {
  const [view, setView] = useState<'home' | 'menu' | 'track' | 'management'>('home')
  const [now, setNow] = useState(() => new Date())
  const [session, setSession] = useState<Session>(() => getServiceState().active ?? 'Lunch')
  const [section, setSection] = useState<Section>('A')
  const [mealType, setMealType] = useState<MealType>('Student Meals')
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [order, setOrder] = useState<Order | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [trackCode, setTrackCode] = useState('')
  const [lookupMessage, setLookupMessage] = useState('')
  const [checkoutError, setCheckoutError] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentPending, setPaymentPending] = useState(false)
  const [served, setServed] = useState(false)
  const [managementUnlocked, setManagementUnlocked] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [adminUser, setAdminUser] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [adminError, setAdminError] = useState('')
  const [unavailableIds, setUnavailableIds] = useState<string[]>([])

  useEffect(() => {
    const saved = window.localStorage.getItem('must-cafeteria-state')
    if (saved) try { const state = JSON.parse(saved); setCart(state.cart ?? []); setOrder(state.order ?? null); setDark(state.dark ?? false); setUnavailableIds(state.unavailableIds ?? []) } catch { window.localStorage.removeItem('must-cafeteria-state') }
  }, [])
  useEffect(() => { window.localStorage.setItem('must-cafeteria-state', JSON.stringify({ cart, order, dark, unavailableIds })) }, [cart, order, dark, unavailableIds, managementUnlocked])
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer) }, [])
  useEffect(() => { if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => undefined) }, [])

  const service = getServiceState(now)
  const activeSession = service.active
  const sessionOpen = activeSession === session
  const nextWindow = serviceWindows[service.next]
  const nextStart = new Date(now)
  nextStart.setHours(Math.floor(nextWindow.start / 60), nextWindow.start % 60, 0, 0)
  if (nextStart <= now) nextStart.setDate(nextStart.getDate() + 1)
  const secondsToNext = Math.max(0, Math.floor((nextStart.getTime() - now.getTime()) / 1000))
  const countdown = `${String(Math.floor(secondsToNext / 3600)).padStart(2, '0')}:${String(Math.floor((secondsToNext % 3600) / 60)).padStart(2, '0')}:${String(secondsToNext % 60).padStart(2, '0')}`
  const availableForSession = meals.filter((meal) => meal.type === mealType && meal.section === section && meal.sessions.includes(session))
  const categories = ['All', ...Array.from(new Set(availableForSession.map((meal) => meal.category)))]
  const filteredMeals = useMemo(() => availableForSession.filter((meal) => (category === 'All' || meal.category === category) && `${meal.name} ${meal.description}`.toLowerCase().includes(query.trim().toLowerCase())), [availableForSession, category, query])
  const menuLabel = section === 'A' ? 'Student meals' : 'Premium dining'
  const hasSearch = query.trim().length > 0 || category !== 'All'
  const isAvailable = (meal: Meal) => meal.available && !unavailableIds.includes(meal.id)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function changeSession(next: Session) { setSession(next); setCategory('All'); setQuery(''); setView('menu') }
  function add(meal: Meal) { if (!sessionOpen || !isAvailable(meal)) return; setCart((items) => items.some((item) => item.id === meal.id) ? items.map((item) => item.id === meal.id ? { ...item, quantity: Math.min(item.quantity + 1, 10) } : item) : [...items, { ...meal, quantity: 1 }]) }
  function change(id: string, delta: number) { setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: Math.max(0, Math.min(item.quantity + delta, 10)) } : item).filter((item) => item.quantity > 0)) }
  function placeOrder() { const phoneDigits = phone.replace(/\D/g, ''); const invalidItems = cart.some((item) => !item.sessions.includes(session) || !isAvailable(item)); if (!name.trim()) { setCheckoutError('Enter your full name to continue.'); return } if (phoneDigits.length < 9) { setCheckoutError('Enter a valid Kenyan phone number.'); return } if (!cart.length) { setCheckoutError('Add at least one available meal.'); return } if (invalidItems) { setCheckoutError(`Your cart has an item that is no longer available for ${session}.`); return } if (paymentPending) return; setCheckoutError(''); setPaymentPending(true); window.setTimeout(() => { const next: Order = { code: `MUST-${Math.floor(1000 + Math.random() * 9000)}`, name: name.trim(), phone, total, status: 'Paid', items: cart, createdAt: new Date().toISOString() }; setOrder(next); setPaymentPending(false); setCheckoutOpen(false); setCart([]); setView('track'); setTrackCode(next.code); setLookupMessage('Payment received. Your order is confirmed.') }, 1200) }
  function lookupOrder() { if (!trackCode.trim()) { setLookupMessage('Enter your order code to continue.'); return } if (!order || trackCode.trim().toUpperCase() !== order.code) { setLookupMessage('We couldn’t find an order with that code.'); return } setLookupMessage('Order found. Status is up to date.') }
  function updateOrderStatus(status: Order['status']) { if (!order) return; setOrder({ ...order, status }); setServed(status === 'Served'); setLookupMessage(status === 'Ready' ? 'Your order is ready for pickup.' : status === 'Served' ? 'Order marked as served.' : 'Order is paid and waiting in the queue.') }
  function loginManagement() { if (adminUser === 'manager@must.ac.ke' && adminPass === 'MUST2026!') { setManagementUnlocked(true); setAdminOpen(false); setAdminError(''); setView('management') } else setAdminError('Use the test credentials shown below.') }

  return <div className={dark ? 'app dark' : 'app'}>
    <header className="site-header"><div className="header-inner"><button className="brand" onClick={() => setView('home')} aria-label="MUST Cafeteria home"><Image src="/must-official-logo.png" alt="Meru University of Science and Technology official logo" width={220} height={96} priority className="official-logo" /></button><nav className={mobileNav ? 'main-nav open' : 'main-nav'} aria-label="Main navigation"><button className={view === 'home' ? 'active' : ''} onClick={() => { setView('home'); setMobileNav(false) }}>Home</button><button className={view === 'menu' ? 'active' : ''} onClick={() => { setView('menu'); setMobileNav(false) }}>Menu</button><button className={view === 'track' ? 'active' : ''} onClick={() => { setView('track'); setMobileNav(false) }}>Track order</button><button onClick={() => setMobileNav(false)}>Help</button><button className={view === 'management' ? 'active' : ''} onClick={() => { managementUnlocked ? setView('management') : setAdminOpen(true); setMobileNav(false) }}>Management</button></nav><div className="header-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>{dark ? <Sun /> : <Moon />}</button><button className="cart-button" onClick={() => setCheckoutOpen(true)} aria-label={`Cart with ${count} items`}><ShoppingBag /><span>{count}</span></button><button className="menu-button" onClick={() => setMobileNav(!mobileNav)} aria-label="Open menu"><Menu /></button></div></div></header>

    {adminOpen && <div className="overlay" role="presentation" onClick={() => setAdminOpen(false)}><aside className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-title" onClick={(e) => e.stopPropagation()}><button className="icon-button close-dialog" onClick={() => setAdminOpen(false)} aria-label="Close management login"><X /></button><div className="admin-icon"><LockKeyhole /></div><p className="eyebrow">STAFF ACCESS</p><h2 id="admin-title">Management sign in</h2><p>Open the cafeteria queue and management tools.</p><div className="checkout-form"><label>Email<input value={adminUser} onChange={(e) => setAdminUser(e.target.value)} placeholder="manager@must.ac.ke" /></label><label>Password<input type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} placeholder="Password" /></label>{adminError && <small className="error-note">{adminError}</small>}<button className="primary" onClick={loginManagement}>Open management</button></div><div className="demo-credentials"><strong>Test credentials</strong><span>manager@must.ac.ke</span><span>MUST2026!</span></div></aside></div>}

    <main>
      {view === 'home' && <><section className="service-hero"><div><p className="eyebrow">{getGreeting(now.getHours())} · {formatClock(now)}</p><h1>Order before you reach the counter.</h1><p className="hero-copy">Choose what is available for this meal session, pay with M-Pesa, and collect it faster.</p><div className="hero-actions"><button className="primary" onClick={() => setView('menu')}>Order lunch <ArrowRight /></button><button className="text-button" onClick={() => setView('track')}>Track an order</button></div></div><div className="service-note"><span className={activeSession ? 'live-dot' : 'closed-dot'} /><span>{activeSession ? `${activeSession} service is open · M-Pesa payments` : `Cafeteria closed · Next session: ${service.next}`}</span><small>{activeSession ? <>Currently serving {activeSession.toLowerCase()} · closes at {serviceWindows[activeSession].label.split(' – ')[1]}</> : <>Ordering locked · opens {serviceWindows[service.next].label} · {countdown}</>}</small></div></section><section className="session-strip"><div><p className="eyebrow">TODAY&apos;S SERVICE</p><h2>Choose a meal session</h2></div><div className="session-tabs">{sessionOrder.map((item) => <button key={item} className={session === item ? 'selected' : ''} onClick={() => changeSession(item)}>{item}<span>{item === 'Lunch' ? 'Main service' : item === 'Breakfast' ? 'Morning service' : 'Evening service'}</span></button>)}</div></section></>}
      {(view === 'home' || view === 'menu') && <section className="menu-section"><div className="section-heading"><div><p className="eyebrow">{session.toUpperCase()} MENU</p><h2>{view === 'home' ? 'Available today' : 'Order your meal'}</h2></div><span className="menu-context"><Clock3 /> {session} · {managementUnlocked ? 'management override active' : 'updated live'}</span></div><div className="menu-toolbar"><div className="segmented"><button className={section === 'A' ? 'selected' : ''} onClick={() => { setSection('A'); setMealType('Student Meals'); setCategory('All') }}>Section A</button><button className={section === 'B' ? 'selected' : ''} onClick={() => { setSection('B'); setMealType('Premium Dining'); setCategory('All') }}>Section B</button></div><div className="segmented meal-type"><button className={mealType === 'Student Meals' ? 'selected' : ''} onClick={() => { setMealType('Student Meals'); setCategory('All') }}>Student meals</button><button className={mealType === 'Premium Dining' ? 'selected' : ''} onClick={() => { setMealType('Premium Dining'); setCategory('All') }}>Premium dining</button></div><label className="search-box"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" aria-label="Search meals" /></label></div><div className="filter-row">{categories.map((item) => <button key={item} className={category === item ? 'filter active' : 'filter'} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="menu-result-line"><span>{filteredMeals.length} {filteredMeals.length === 1 ? 'meal' : 'meals'} available in {menuLabel}</span>{hasSearch && <button className="clear-filter" onClick={() => { setQuery(''); setCategory('All') }}>Clear filters</button>}</div>{!sessionOpen && <div className="menu-locked" role="status"><LockKeyhole /><div><strong>{session} ordering is closed</strong><span>Meals will appear and ordering will open during {serviceWindows[session].label}.</span></div><b>Next: {service.next} in {countdown}</b></div>}<div className={sessionOpen ? 'meal-grid' : 'meal-grid menu-grid-locked'}>{filteredMeals.map((meal) => <article className="meal-card" key={meal.id}><div className="meal-image"><FoodImage src={meal.image} alt={meal.name} /><span className={isAvailable(meal) ? 'available' : 'sold-out'}>{isAvailable(meal) ? 'Available' : 'Sold out'}</span></div><div className="meal-info"><div><h3>{meal.name}</h3><p>{meal.description}</p></div><div className="meal-buy"><strong>{money(meal.price)}</strong><button className="add-button" disabled={!isAvailable(meal)} onClick={() => add(meal)}>{isAvailable(meal) ? <><Plus /> Add</> : 'Sold out'}</button></div></div></article>)}</div>{!filteredMeals.length && <div className="empty"><Search /><h3>No meals found.</h3><p>Try another session, category or search.</p></div>}</section>}
      {view === 'track' && <section className="page-section track-page"><p className="eyebrow">ORDER STATUS</p><h1>Track your order</h1><p className="lead">Enter your order code to see the latest update at the counter.</p><div className="track-form"><input value={trackCode} onChange={(e) => setTrackCode(e.target.value)} placeholder="e.g. MUST-4821" aria-label="Order code" /><button className="primary" onClick={lookupOrder}>Find order</button></div>{lookupMessage && <p className="form-message" role="status">{lookupMessage}</p>}{order && <div className="order-status"><div className="order-status-top"><div><span className="eyebrow">ORDER {order.code}</span><h2>{order.name}&apos;s order</h2></div><span className="status-pill">{served ? 'Served' : order.status}</span></div><div className="progress"><div className="progress-step done"><span><Check /></span><b>Order received</b><small>Order is in the queue</small></div><div className="progress-step done"><span><Check /></span><b>Payment confirmed</b><small>M-Pesa payment received</small></div><div className={served ? 'progress-step done' : 'progress-step'}><span>{served ? <Check /> : <Clock3 />}</span><b>{served ? 'Served' : order.status === 'Ready' ? 'Ready for pickup' : 'Preparing your order'}</b><small>{served ? 'Enjoy your meal' : order.status === 'Ready' ? 'Say your code at the counter' : 'The cafeteria is preparing your meal'}</small></div></div><div className="pickup-note"><Ticket /> <span>Go to the cafeteria counter and say <strong>{order.code}</strong>.</span></div></div>}{!order && <div className="track-empty"><Ticket /><h3>Your order will appear here.</h3><p>After payment, use the code on your confirmation screen.</p></div>}</section>}
      {view === 'management' && <section className="page-section management-page"><div className="management-head"><div><p className="eyebrow">CAFETERIA OPERATIONS</p><h1>Serve students faster.</h1><p className="lead">Live queue · {session} · first come, first served</p></div><button className="outline-button" onClick={() => setView('home')}><LockKeyhole /> Sign out</button></div><div className="stats"><div><span>Active orders</span><strong>{served || !order ? 0 : 1}</strong></div><div><span>Today&apos;s revenue</span><strong>{money(order ? order.total : 0)}</strong></div><div><span>Served today</span><strong>{served ? 1 : 0}</strong></div></div><div className="queue"><div className="queue-heading"><div><p className="eyebrow">LIVE ORDER QUEUE</p><h2>Orders to serve</h2></div><span className="status-pill">Live</span></div>{order && order.status !== 'Served' ? <div className="queue-row"><div className="queue-number">#1</div><div className="queue-details"><strong>{order.code} · {order.name}</strong><span>{order.items.map((item) => `${item.quantity} × ${item.name}`).join(' · ')} · Paid just now</span></div><strong>{money(order.total)}</strong>{order.status === 'Paid' && <button className="primary small" onClick={() => updateOrderStatus('Ready')}>Mark ready</button>}{order.status === 'Ready' && <button className="primary small" onClick={() => updateOrderStatus('Served')}>Mark served</button>}</div> : <div className="queue-empty"><Check /><span>{served ? 'Order served. The queue is clear.' : 'No active orders right now.'}</span></div>}</div><div className="availability-panel"><div><p className="eyebrow">MENU AVAILABILITY</p><h2>Switch meals on or off</h2></div><div className="availability-list">{meals.filter((meal) => meal.sessions.includes(session)).slice(0, 8).map((meal) => <div className="availability-row" key={meal.id}><span><strong>{meal.name}</strong><small>{meal.sessions.join(' · ')}</small></span><button className={isAvailable(meal) ? 'toggle on' : 'toggle'} onClick={() => setUnavailableIds((ids) => ids.includes(meal.id) ? ids.filter((id) => id !== meal.id) : [...ids, meal.id])} aria-label={`Set ${meal.name} ${isAvailable(meal) ? 'unavailable' : 'available'}`}>{isAvailable(meal) ? 'Available' : 'Sold out'}</button></div>)}</div></div></section>}
    </main>

    {count > 0 && !checkoutOpen && <button className="sticky-cart" onClick={() => setCheckoutOpen(true)}><span><ShoppingBag /> {count} {count === 1 ? 'item' : 'items'}</span><strong>{money(total)} <ArrowRight /></strong></button>}
    {checkoutOpen && <div className="overlay" role="presentation" onClick={() => setCheckoutOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(e) => e.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">YOUR ORDER</p><h2 id="cart-title">Cart <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCheckoutOpen(false)} aria-label="Close cart"><X /></button></div>{cart.length ? <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><FoodImage src={item.image} alt="" compact /><div><strong>{item.name}</strong><span>{money(item.price)} each</span><div className="quantity"><button onClick={() => change(item.id, -1)} aria-label={`Remove one ${item.name}`}><Minus /></button><b>{item.quantity}</b><button onClick={() => change(item.id, 1)} aria-label={`Add one ${item.name}`}><Plus /></button></div></div><strong>{money(item.price * item.quantity)}</strong></div>)}</div><div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><div className="checkout-form"><label>Full name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Mwangi" /></label><label>Phone number<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XX XXX XXX" inputMode="tel" /></label><div className="payment-choice"><span><span className="payment-mark">M</span><span><strong>M-Pesa</strong><small>STK Push payment</small></span></span><span className="active-payment">Active</span></div><div className="payment-choice disabled-payment"><span><span className="payment-mark wallet">W</span><span><strong>E-wallet</strong><small>Campus wallet</small></span></span><span>Coming soon</span></div>{checkoutError && <p className="error-note" role="alert">{checkoutError}</p>}<button className="primary pay-button" disabled={paymentPending} onClick={placeOrder}>{paymentPending ? 'Requesting M-Pesa payment…' : <>Pay {money(total)} with M-Pesa <ArrowRight /></>}</button><small className="secure-note">You will receive an M-Pesa prompt on your phone.</small></div></> : <div className="cart-empty"><ShoppingBag /><h3>Your cart is empty</h3><p>Add a meal from the menu to get started.</p><button className="primary" onClick={() => { setCheckoutOpen(false); setView('menu') }}>Browse menu</button></div>}</aside></div>}
    <footer><div><Image src="/must-official-logo.png" alt="Meru University of Science and Technology official logo" width={220} height={96} className="footer-logo" /><span>Campus food ordering · Meru University of Science and Technology</span></div><div className="footer-links"><button onClick={() => setView('home')}>Home</button><button onClick={() => setView('menu')}>Menu</button><button onClick={() => setView('track')}>Track order</button><button><CircleHelp /> Help</button><a href="https://www.must.ac.ke/" target="_blank" rel="noreferrer">MUST website</a><a href="https://www.must.ac.ke/contact-us/" target="_blank" rel="noreferrer">Contact MUST</a><a href="mailto:cafeteria@must.ac.ke">Cafeteria support</a></div><small>MUST Cafeteria · M-Pesa payments</small></footer>
  </div>
}
