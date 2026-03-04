const CART_KEY = "amalk_cart_v1";

function getCart() {
    try {
        let cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (e) { return []; }
}

function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const el = document.getElementById("cartCount");
    if (el) el.textContent = total;
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(name, price, image = "") {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // تأكدنا إن السعر بيتخزن كرقم Number
        cart.push({ name, price: Number(price), image, quantity: 1 });
    }

    saveCart(cart);
    alert("المنتج اتضاف يا بطل! ✅");
}

document.addEventListener("DOMContentLoaded", updateCartCount);