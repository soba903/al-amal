/* int.js — شركة الأمل | EmailJS + Navigation Helpers */

/* تهيئة EmailJS */
(function(){
  if(window.emailjs && typeof emailjs.init === 'function'){
    emailjs.init('SvpoqikCIslazGM2Z');
  }
})();

/* ===== Navigation ===== */
function openCategory(page) {
  window.location.href = page + '.html';
}

function buyCategory(category) {
  const map = {
    'cosmetics':  'cosmetics.html',
    'medical':    'medical.html',
    'hair-care':  'hair-care.html',
    'skin-care':  'skin-care.html',
    'baby-care':  'baby-care.html',
    'perfumes':   'perfumes.html',
    'make-up':    'make-up.html',
    'tissues':    'tissues.html',
    'labs':       'labs.html',
  };
  if(map[category]) window.location.href = map[category];
}

function getQueryParam(key){
  return new URLSearchParams(window.location.search).get(key);
}

/* ===== Forms (EmailJS) ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Contact Form --- */
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const params = {
        name:    this.querySelector('[name="name"]')?.value || '',
        email:   this.querySelector('[name="email"]')?.value || '',
        message: this.querySelector('[name="message"]')?.value || ''
      };
      emailjs.send('service_34tw6rq', 'template_11oixht', params)
        .then(()=>{ alert('✅ تم إرسال الرسالة. شكراً!'); this.reset(); })
        .catch(err=>{ console.error(err); alert('❌ حدث خطأ، حاول مرة أخرى.'); });
    });
  }

  /* --- Checkout Form --- */
  const checkoutForm = document.getElementById('checkoutForm');
  if(checkoutForm){
    // تعبئة اسم المنتج من الـ URL
    const productFromQuery = getQueryParam('product');
    const productInput = checkoutForm.querySelector('#productName');
    if(productFromQuery && productInput){
      productInput.value = decodeURIComponent(productFromQuery);
    }
  }

});





