/* Cart.js — شركة الأمل | إدارة سلة المشتريات */
const CART_KEY = "amalk_cart_v1";

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch(e) { return []; }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // تحديث العداد في الهيدر
    if(typeof refreshCartCount === 'function') refreshCartCount();
}

function updateCartCount() {
    if(typeof refreshCartCount === 'function') {
        refreshCartCount();
    } else {
        const cart = getCart();
        const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const el = document.getElementById('cart-count');
        if(el) el.innerText = total;
    }
}

function addToCart(name) {
    const cleanName = name.trim();
    // البحث عن السعر من الصفحة
    const allProducts = document.querySelectorAll('.product');
    let price = 0;
    allProducts.forEach(p => {
        if((p.getAttribute('data-name') || '').trim() === cleanName) {
            const priceEl = p.querySelector('.price');
            if(priceEl) price = parseFloat(priceEl.innerText.replace(/[^\d.]/g, '')) || 0;
        }
    });

    let cart = getCart();
    let existing = cart.find(i => i.name === cleanName);
    if(existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name: cleanName, price: price, quantity: 1 });
    }
    saveCart(cart);
    
    // Toast notification
    showToast(`✅ تمت إضافة ${cleanName} للسلة`);
}

function buyNow(name, qtyId) {
    const cleanName = name.trim();
    const allProducts = document.querySelectorAll('.product');
    let price = 0;
    
    allProducts.forEach(p => {
        const dataName = (p.getAttribute('data-name') || '').trim();
        if(dataName === cleanName || dataName.includes(cleanName) || cleanName.includes(dataName)) {
            const priceEl = p.querySelector('.price');
            if(priceEl) price = parseFloat(priceEl.innerText.replace(/[^\d.]/g, '')) || 0;
        }
    });

    const qty = document.getElementById(qtyId) ? document.getElementById(qtyId).value : 1;
    window.location.href = `checkout.html?product=${encodeURIComponent(cleanName)}&price=${price}&quantity=${qty}`;
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if(toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }
}

document.addEventListener('DOMContentLoaded', updateCartCount);