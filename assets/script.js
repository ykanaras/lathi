/* ---- Lathi Soaps Shared Script ---- */
const EMAIL_TO = 'lathisoaps@example.com'; // TODO: replace with your email
const STRIPE_PAYMENT_LINK = ''; // Optional: paste your Stripe Payment Link

const PRODUCTS = [
  { id: 'classic-olive', name: 'Classic Olive Bar', price: 8.00, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1400&auto=format&fit=crop', sizes: ['Standard 4.5oz','Mini 2oz'], scent: ['Unscented','Lavender','Lemon'] },
  { id: 'lavender-olive', name: 'Lavender Olive Bar', price: 9.50, img: 'https://images.unsplash.com/photo-1610874150309-1a9f1b06ad2d?q=80&w=1400&auto=format&fit=crop', sizes: ['Standard 4.5oz','Large 6oz'], scent: ['Lavender'] },
  { id: 'herbal-trio', name: 'Herbal Trio Set', price: 24.00, img: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1400&auto=format&fit=crop', sizes: ['Gift Set'], scent: ['Mixed'] },
  { id: 'olive-honey', name: 'Olive & Oat Bar', price: 10.00, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop', sizes: ['Standard 4.5oz'], scent: ['Unscented'] },
  { id: 'citrus-zest', name: 'Citrus Zest Bar', price: 9.00, img: 'https://images.unsplash.com/photo-1604335399105-a0d7b2d05f5d?q=80&w=1400&auto=format&fit=crop', sizes: ['Standard 4.5oz'], scent: ['Lemon','Sweet Orange'] },
  { id: 'variety-pack', name: 'Variety 4-Pack', price: 30.00, img: 'https://images.unsplash.com/photo-1541668274761-03a34cf09f4b?q=80&w=1400&auto=format&fit=crop', sizes: ['Assorted'], scent: ['Mixed'] },
];

// Local-first image paths; if these files exist in /assets/images they will be used.
// Otherwise we fall back to stock URLs.
const IMAGE_MAP = {
  hero: { local: 'assets/images/hero.jpg', remote: 'https://images.unsplash.com/photo-1585386959984-a41552231677?q=80&w=1600&auto=format&fit=crop' },
  about: { local: 'assets/images/about.jpg', remote: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1400&auto=format&fit=crop' },
  products: {
    'classic-olive': { local: 'assets/images/classic-olive.jpg', remote: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1400&auto=format&fit=crop' },
    'lavender-olive': { local: 'assets/images/lavender-olive.jpg', remote: 'https://images.unsplash.com/photo-1610874150309-1a9f1b06ad2d?q=80&w=1400&auto=format&fit=crop' },
    'herbal-trio':   { local: 'assets/images/herbal-trio.jpg', remote: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1400&auto=format&fit=crop' },
    'olive-honey':   { local: 'assets/images/olive-oat.jpg', remote: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop' },
    'citrus-zest':   { local: 'assets/images/citrus-zest.jpg', remote: 'https://images.unsplash.com/photo-1604335399105-a0d7b2d05f5d?q=80&w=1400&auto=format&fit=crop' },
    'variety-pack':  { local: 'assets/images/variety-pack.jpg', remote: 'https://images.unsplash.com/photo-1541668274761-03a34cf09f4b?q=80&w=1400&auto=format&fit=crop' },
  }
};


function money(n){ return `$${n.toFixed(2)}`; }
function el(html){ const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; }

// Header builder for all pages
function renderHeader(active){
  const header = document.querySelector('header .nav-links');
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'shop.html', label: 'Shop' },
    { href: 'about.html', label: 'About' },
    { href: 'faq.html', label: 'FAQ' },
    { href: 'contact.html', label: 'Contact' },
  ];
  header.innerHTML = pages.map(p => `<a href="${p.href}" ${active===p.href?'style="background:#eef2ff"':''}>${p.label}</a>`).join('')
    + ` <button class="cart-btn" id="openCart"><span>Cart</span> <span class="badge" id="cartCount">0</span></button>`;
}

// Footer year
function setYear(){ const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear(); }

// CART
const cartKey = 'lathi_cart_v1';
let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
function saveCart(){ localStorage.setItem(cartKey, JSON.stringify(cart)); }
function updateCount(){ const el = document.getElementById('cartCount'); if(el) el.textContent = cart.reduce((a,i)=>a+i.qty,0); }
function totals(){
  const subtotal = cart.reduce((a,i)=>a + i.price * i.qty, 0);
  const shipping = cart.length ? 5.00 : 0.00;
  const tax = 0.00;
  const grand = subtotal + shipping + tax;
  return {subtotal, shipping, tax, grand};
}
function openDrawer(){ document.getElementById('cartDrawer').classList.add('open'); document.getElementById('overlay').classList.add('show'); }
function closeDrawer(){ document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }
function renderCart(){
  const lines = document.getElementById('cartLines'); if(!lines) return;
  lines.innerHTML = '';
  cart.forEach(i=>{
    const line = el(`
      <div class="cart-line">
        <div>
          <strong>${i.name}</strong>
          <small>${i.size} • ${i.scent}</small>
          <div class="fine">${money(i.price)} each</div>
        </div>
        <div class="cart-actions">
          <input type="number" min="1" value="${i.qty}" aria-label="Quantity for ${i.name}" />
          <button class="btn btn-outline" aria-label="Remove">Remove</button>
        </div>
      </div>
    `);
    const qty = line.querySelector('input');
    const btn = line.querySelector('button');
    qty.addEventListener('input', e=>{ i.qty = Math.max(1, parseInt(e.target.value||'1',10)); saveCart(); renderCart(); });
    btn.addEventListener('click', ()=>{ cart = cart.filter(x=>x!==i); saveCart(); renderCart(); });
    lines.appendChild(line);
  });
  const t = totals();
  const subtotalEl = document.getElementById('subtotal'); if(subtotalEl) subtotalEl.textContent = money(t.subtotal);
  const shippingEl = document.getElementById('shipping'); if(shippingEl) shippingEl.textContent = money(t.shipping);
  const taxEl = document.getElementById('tax'); if(taxEl) taxEl.textContent = money(t.tax);
  const grandEl = document.getElementById('grand'); if(grandEl) grandEl.textContent = money(t.grand);
  updateCount();
}
function addToCartById(id, size, scent, qty=1){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  const key = id+'|'+size+'|'+scent;
  const existing = cart.find(i=>i.key===key);
  if(existing){ existing.qty += qty; }
  else{ cart.push({ key, id, name:p.name, size, scent, price:p.price, qty }); }
  saveCart(); renderCart(); openDrawer();
}

// Build product cards (for shop page)

function renderProducts(){
  const grid = document.getElementById('productGrid'); if(!grid) return;
  PRODUCTS.forEach(p=>{
    // Decide local file name by id
    const localMap = {
      'classic-olive': 'assets/images/classic-olive.jpg',
      'lavender-olive': 'assets/images/lavender-olive.jpg',
      'herbal-trio': 'assets/images/herbal-trio.jpg',
      'olive-honey': 'assets/images/olive-oat.jpg',
      'citrus-zest': 'assets/images/citrus-zest.jpg',
      'variety-pack': 'assets/images/variety-pack.jpg',
    };
    const remoteMap = {
      'classic-olive': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1400&auto=format&fit=crop',
      'lavender-olive': 'https://images.unsplash.com/photo-1610874150309-1a9f1b06ad2d?q=80&w=1400&auto=format&fit=crop',
      'herbal-trio': 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1400&auto=format&fit=crop',
      'olive-honey': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop',
      'citrus-zest': 'https://images.unsplash.com/photo-1604335399105-a0d7b2d05f5d?q=80&w=1400&auto=format&fit=crop',
      'variety-pack': 'https://images.unsplash.com/photo-1541668274761-03a34cf09f4b?q=80&w=1400&auto=format&fit=crop',
    };
    const local = localMap[p.id];
    const remote = remoteMap[p.id];

    const card = el(`
      <article class="card" role="listitem">
        <img loading="lazy" src="${local}" onerror="this.onerror=null;this.src='${remote}'" alt="${p.name}" style="border-radius:12px; aspect-ratio:4/3; object-fit:cover;">
        <div>
          <h3 style="margin:10px 0 6px">${p.name}</h3>
          <div class="price">${money(p.price)}</div>
        </div>
        <div class="controls">
          <label class="sr-only" for="size-${p.id}">Size</label>
          <select class="select" id="size-${p.id}">${p.sizes.map(s=>`<option>${s}</option>`).join('')}</select>
          <label class="sr-only" for="scent-${p.id}">Scent</label>
          <select class="select" id="scent-${p.id}">${p.scent.map(s=>`<option>${s}</option>`).join('')}</select>
          <label class="sr-only" for="qty-${p.id}">Qty</label>
          <input class="qty" id="qty-${p.id}" type="number" min="1" value="1" />
          <button class="btn btn-outline add" data-id="${p.id}">Add to cart</button>
        </div>
      </article>
    `);
    grid.appendChild(card);
  });
  document.querySelectorAll('.add').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      const size = document.getElementById('size-'+id).value;
      const scent = document.getElementById('scent-'+id).value;
      const qty = Math.max(1, parseInt(document.getElementById('qty-'+id).value || '1',10));
      addToCartById(id, size, scent, qty);
    });
  });
}

// Checkout form handler
function bindCheckoutForm(){
  const form = document.getElementById('checkoutForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(cart.length===0){ alert('Your cart is empty.'); return; }
    const t = totals();
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const address = data.get('address');
    const notes = data.get('notes');

    const lines = cart.map(i => `• ${i.name} — ${i.size}, ${i.scent} × ${i.qty} = ${money(i.price*i.qty)}`).join('%0A');
    const subject = encodeURIComponent(`Order — Lathi Soaps — ${name}`);
    const body = encodeURIComponent(
`Customer: ${name}
Email: ${email}

Shipping Address:
${address}

Order:
${decodeURIComponent(lines)}

Subtotal: ${money(t.subtotal)}
Shipping: ${money(t.shipping)}
Tax: ${money(t.tax)}
Total: ${money(t.grand)}

Notes:
${notes || '-'}

(Generated from lathisoaps site)`);
    if(STRIPE_PAYMENT_LINK){
      window.location.href = STRIPE_PAYMENT_LINK; // send to Stripe if set
    }else{
      window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
    }
  });
}

// Drawer bindings used on all pages
function bindDrawer(){
  const overlay = document.getElementById('overlay');
  const drawer = document.getElementById('cartDrawer');
  const openBtn = document.getElementById('openCart');
  const closeBtn = document.getElementById('closeCart');
  if(!overlay || !drawer || !openBtn || !closeBtn) return;
  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ closeDrawer(); } });
}

// Boot per page
document.addEventListener('DOMContentLoaded', ()=>{
  // highlight current page
  const current = location.pathname.split('/').pop() || 'index.html';
  renderHeader(current);
  setYear();
  renderProducts();         // if present
  bindCheckoutForm();       // if present
  bindDrawer();
  renderCart();
});