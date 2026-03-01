/* int.js
 - التحكم بالانتقالات البسيطة (عن طريق window.location.href إلى صفحات منفصلة)
 - إرسال فورمات checkout و contact عبر EmailJS
 - قيمة EmailJS مأخوذة من إعداداتك
*/

/* EmailJS init */
(function(){
  if(window.emailjs && typeof emailjs.init === 'function'){
    emailjs.init('SvpoqikCIslazGM2Z'); // PUBLIC KEY
  } else {
    console.warn('EmailJS library not loaded. Make sure contact/checkout HTML include the EmailJS script tag.');
  }
})();

/* -------------------
   Navigation helpers
   ------------------- */
function buyCategory(type){
  // يفتح صفحة المنتجات مع الفلتر عن طريق query param
  window.location.href = `products.html?cat=${encodeURIComponent(type)}`;
}

function buyProduct(productName){
  // يفتح checkout مع اسم المنتج في الـ query string
  window.location.href = `checkout.html?product=${encodeURIComponent(productName)}`;
}

/* -------------------
   Utility: read query param
   ------------------- */
function getQueryParam(key){
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/* -------------------
   Attach handlers for forms (contact & checkout)
   These pages include the EmailJS script tag before int.js is loaded.
   ------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // CONTACT form (if present)
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const templateParams = {
        name: contactForm.querySelector('[name="name"]').value || '',
        email: contactForm.querySelector('[name="email"]').value || '',
        message: contactForm.querySelector('[name="message"]').value || ''
      };
      // send via EmailJS
      emailjs.send('service_34tw6rq', 'template_11oixht', templateParams)
        .then(()=> {
          alert('✅ تم إرسال الرسالة. شكراً لتواصلك!');
          contactForm.reset();
        }).catch(err=>{
          console.error('EmailJS contact error:', err);
          alert('❌ حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
        });
    });
  }

  // CHECKOUT form (if present)
  const checkoutForm = document.getElementById('checkoutForm');
  if(checkoutForm){
    // prefill product from query param if available
    const productFromQuery = getQueryParam('product');
    const productInput = checkoutForm.querySelector('[name="product"]') || checkoutForm.querySelector('#productName');
    if(productFromQuery && productInput){
      // if page has an input for product name use it, else create hidden field
      if(productInput.tagName){
        productInput.value = decodeURIComponent(productFromQuery);
      } else {
        // create hidden input
        const inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = 'product';
        inp.id = 'productName';
        inp.value = decodeURIComponent(productFromQuery);
        checkoutForm.appendChild(inp);
      }
    }

    checkoutForm.addEventListener('submit', function(e){
      e.preventDefault();
      // collect fields (allow forms with different input names)
      const name = checkoutForm.querySelector('[name="name"]')?.value || '';
      const email = checkoutForm.querySelector('[name="email"]')?.value || '';
      const phone = checkoutForm.querySelector('[name="phone"]')?.value || '';
      const address = checkoutForm.querySelector('[name="address"]')?.value || '';
      const product = checkoutForm.querySelector('[name="product"]')?.value || getQueryParam('product') || '';

      if(!name || !email || !phone || !address || !product){
        alert('من فضلك أكمل جميع الحقول المطلوبة.');
        return;
      }

      const templateParams = {
        name, email, phone, address, product,
        // you can add more fields here (quantity, payment method etc)
      };

      emailjs.send('service_34tw6rq', 'template_11oixht', templateParams)
        .then(()=>{
          alert('✅ تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
          checkoutForm.reset();
          // redirect to homepage after a moment
          setTimeout(()=> { window.location.href = 'index.html'; }, 800);
        }).catch(err=>{
          console.error('EmailJS checkout error:', err);
          alert('❌ حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى أو تواصل معنا مباشرة.');
        });

    });
  }

  // If products page, render products list dynamically
  const productsListContainer = document.getElementById('products-list');
  if(productsListContainer){
    renderProductsPage();
  }
});

/* -------------------
   PRODUCTS DATA + RENDER
   تعديل المنتجات يتم هنا: أضف/حرر عناصر في هذا المصفوفة
   ------------------- */
const PRODUCTS = [
  // medical
  { id:'m1', category:'medical', title:'جهاز ضغط رقمي', price:800, img:'images/pressure.jpg', desc:'جهاز ضغط رقمي دقيق مع شاشة عرض' },
  { id:'m2', category:'medical', title:'ترمومتر رقمي', price:150, img:'images/thermo.jpg', desc:'ترمومتر سريع ودقيق' },

  // cosmetics
  { id:'c1', category:'cosmetics', title:'كريم ترطيب', price:120, img:'images/cream.jpg', desc:'كريم ترطيب مناسب للبشرة الحساسة' },
  { id:'c2', category:'cosmetics', title:'سيروم فيتامين C', price:250, img:'images/serum.jpg', desc:'سيروم فعال لتفتيح البشرة' },

  // labs
  { id:'l1', category:'labs', title:'أنابيب تحليل (100 قطعة)', price:200, img:'images/tubes.jpg', desc:'أنابيب اختبار عالية الجودة' },
  { id:'l2', category:'labs', title:'ميكروسكوب معملي', price:3200, img:'images/microscope.jpg', desc:'ميكروسكوب مع عدسات قوية' }
];

function renderProductsPage(){
  const container = document.getElementById('products-list');
  container.innerHTML = '';
  const cat = getQueryParam('cat'); // optional filter
  const list = cat ? PRODUCTS.filter(p=>p.category===cat) : PRODUCTS;
  if(list.length === 0){
    container.innerHTML = '<p class="muted">لا توجد منتجات في هذا القسم حالياً.</p>';
    return;
  }
  list.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'prod-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/600x400?text=${encodeURIComponent(p.title)}'">
      <div class="prod-body">
        <h3>${p.title}</h3>
        <p class="desc">${p.desc}</p>
        <div class="price">${p.price} EGP</div>
        <div class="prod-actions">
          <button class="btn" onclick="buyProduct('${escapeQuotes(p.title)}')">اشترِ الآن</button>
          <button class="btn ghost" onclick="addToCart('${p.id}')">أضف للسلة</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/* small helpers */
function escapeQuotes(str){ return str.replace(/'/g,"\\'").replace(/"/g,'\\"'); }

/* simple cart (localStorage) */
function addToCart(id){
  const item = PRODUCTS.find(p=>p.id===id);
  if(!item) return;
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const found = cart.find(x=>x.id===id);
  if(found) found.qty++;
  else cart.push({id:item.id,title:item.title,price:item.price,qty:1});
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('✅ أضيف إلى السلة');
}
// بيانات المنتجات
const products = [
  {
    name: "شامبو لوريال 400 مل - أبيض",
    desc: "ينظف الشعر بعمق ويمنحه لمعانًا طبيعيًا.",
    price: 129.34,
    img: "images/shampoo-loreal-400.jpg"
  },
  {
    name: "شامبو دوف ضد التساقط 350 مل",
    desc: "يغذي الشعر ويقلل من التساقط مع كل غسلة.",
    price: 104.31,
    img: "images/shampoo-dove.jpg"
  },
  {
    name: "شامبو فاتيكا بالجرجير",
    desc: "يقوي جذور الشعر ويمنحه الحيوية.",
    price: 45.11,
    img: "images/shampoo-vatika.jpg"
  },
  {
    name: "كريم فاتيكا للشعر بزيت الزيتون",
    desc: "يرطب الشعر ويمنحه نعومة فائقة.",
    price: 41.45,
    img: "images/cream-vatika.jpg"
  },
  {
    name: "بلسم لوريال دريم لونج",
    desc: "لشعر صحي وطويل بدون تقصف.",
    price: 99.00,
    img: "images/balsam-loreal.jpg"
  },
  {
    name: "زيت أملا لتقوية الشعر",
    desc: "يغذي الشعر من الجذور حتى الأطراف.",
    price: 67.87,
    img: "images/oil-amla.jpg"
  },
];

// عرض المنتجات في الصفحة
const grid = document.getElementById("productGrid");
products.forEach(prod => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${prod.img}" alt="${prod.name}">
    <h3>${prod.name}</h3>
    <p>${prod.desc}</p>
    <div class="price">${prod.price} ج.م</div>
    <button onclick="addToCart('${prod.name}')">🛒 أضف للسلة</button>
    <button onclick="buyNow('${prod.name}')">💳 اشتري الآن</button>
  `;
  grid.appendChild(card);
});

// البحث
document.getElementById("searchBar").addEventListener("keyup", function() {
  const query = this.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

// أزرار التفاعل
function addToCart(name) {
  alert(`تم إضافة "${name}" إلى السلة ✅`);
}

function buyNow(name) {
  localStorage.setItem("selectedProduct", name);
  window.location.href = "checkout.html";
}
function buyCategory(category) {
  if (category === 'cosmetics') {
    window.location.href = 'cosmetics.html';
  } else if (category === 'medical') {
    window.location.href = 'medical.html';
  } else if (category === 'haircare') {
    window.location.href = 'haircare.html';
  } else if (category === 'skincare') {
    window.location.href = 'skincare.html';
  }
}
// كود بيكلم الـ Backend عشان يسجل دخول
async function loginUser(email, password) {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token); // حفظ المفتاح في المتصفح
        alert("تم تسجيل الدخول بنجاح!");
    } else {
        alert(data.msg || "خطأ في البيانات");
    }
}





