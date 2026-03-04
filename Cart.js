const CART_KEY = "amalk_cart_v1";

// ✅ قراءة السلة
function getCart() {
  try {
    let cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (e) {
    console.error("Error reading cart:", e);
    return [];
  }
}

// ✅ حفظ السلة
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

// ✅ تحديث رقم السلة في الهيدر
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const el = document.getElementById("cartCount");
  if (el) el.textContent = total;
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  alert("المنتج اتضاف يا بطل! ✅"); // ضيف السطر ده
  updateCartCount();
}
// ✅ إضافة منتج للسلة
function addToCart(name, price, image = "") {
  const cart = getCart();

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      image,
      quantity: 1
    });
  }

  saveCart(cart);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
const proceedToCheckout = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert("يا بطل، لازم تسجل دخول الأول عشان تشتري!");
        // ممكن هنا تحوله لصفحة اللوجين لو حابب
        return;
    }

    // هنا بنكلم السيرفر بتاعنا (Backend)
    const response = await fetch('http://localhost:5000/api/payment/checkout', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token // بنبعت التوكن للأمان
        },
        body: JSON.stringify({
            items: [
                {
                    price_data: {
                        currency: 'egp',
                        product_data: { name: 'منتجات متجر مارتن' },
                        unit_amount: 50000, // السعر بالقرش (يعني 500 جنيه)
                    },
                    quantity: 1,
                }
            ]
        })
    });

    const data = await response.json();
    if (data.url) {
        window.location.href = data.url; // هيحولك لصفحة الدفع فوراً
    }
};
async function startCheckout() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("لازم تسجل دخول الأول!");
        return;
    }

    const response = await fetch('http://localhost:5000/api/payment/checkout', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token 
        },
        body: JSON.stringify({
            items: [{ 
                price_data: { currency: 'egp', product_data: { name: 'Order' }, unit_amount: 50000 }, 
                quantity: 1 
            }]
        })
    });

    const data = await response.json();
    if (data.url) window.location.href = data.url; 
}