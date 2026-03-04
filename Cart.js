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

// دالة الإضافة للسلة - ضفنا فيها السعر
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("amalk_cart_v1")) || [];
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: parseFloat(price), quantity: 1 });
    }
    localStorage.setItem("amalk_cart_v1", JSON.stringify(cart));
    alert("✅ تمت إضافة " + name + " للسلة");
}

// دالة اشترِ الآن - اللي كانت شغالة عندك بس ظبطناها للسعر والكمية
function buyNow(name, price, qtyId) {
    const qty = document.getElementById(qtyId).value || 1;
    // بنبعت البيانات في اللينك لصفحة checkout
    window.location.href = `checkout.html?product=${encodeURIComponent(name)}&price=${price}&quantity=${qty}`;
}

document.addEventListener("DOMContentLoaded", updateCartCount);