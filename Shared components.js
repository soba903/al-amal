// ===== SHARED HEADER & FOOTER - شركة الأمل =====
const PHONE = '01278413553';
const WA_LINK = 'https://wa.me/201278413553';

const SITE_HEADER = `
<div class="announce-bar">🚚 توصيل لجميع أنحاء مصر — واتساب: ${PHONE}</div>
<header class="site-header">
    <div class="header-inner">
        <a href="index.html" class="brand">
            <div class="brand-logo">🏥</div>
            <div>
                <div class="brand-text">الأمل</div>
                <div class="brand-sub">للمستلزمات الطبية والتجميل</div>
            </div>
        </a>
        <nav class="main-nav">
            <a href="index.html" class="nav-link">🏠 الرئيسية</a>
            <a href="medical.html" class="nav-link">🏥 طبي</a>
            <a href="cosmetics.html" class="nav-link">💄 تجميل</a>
            <a href="contact.html" class="nav-link">📞 تواصل</a>
        </nav>
        <div onclick="window.location.href='cart.html'" style="position:relative;width:48px;height:48px;background:#e91e63;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:20px;box-shadow:0 4px 15px rgba(233,30,99,0.4);flex-shrink:0;">
            🛒<span id="cart-count" style="position:absolute;top:-4px;right:-4px;background:white;color:#e91e63;border-radius:50%;width:20px;height:20px;font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:900;border:2px solid #e91e63;">0</span>
        </div>
    </div>
</header>`;

const SITE_FOOTER = `
<footer class="site-footer-global">
    <div class="footer-inner-global">
        <div class="footer-grid-global">
            <div class="footer-col-global">
                <h4>🏥 الأمل</h4>
                <p>متجركم الأول للمستلزمات الطبية ومنتجات التجميل بجودة عالية وأسعار مناسبة.</p>
            </div>
            <div class="footer-col-global">
                <h4>روابط سريعة</h4>
                <a href="index.html">🏠 الرئيسية</a>
                <a href="medical.html">🏥 مستلزمات طبية</a>
                <a href="cosmetics.html">💄 مستحضرات تجميل</a>
                <a href="hair-care.html">💆 العناية بالشعر</a>
                <a href="baby-care.html">👶 عناية الأطفال</a>
            </div>
            <div class="footer-col-global">
                <h4>تواصل معنا</h4>
                <a href="tel:+20${PHONE}">📞 ${PHONE}</a>
                <a href="${WA_LINK}" target="_blank">💬 واتساب</a>
                <a href="cart.html">🛒 سلة المشتريات</a>
                <a href="contact.html">📍 تواصل معنا</a>
            </div>
        </div>
        <div class="footer-bottom-global">© 2025 شركة الأمل للمستلزمات الطبية والتجميل — جميع الحقوق محفوظة</div>
    </div>
</footer>
<a href="${WA_LINK}" class="wa-fab-global" target="_blank" title="تواصل عبر واتساب">💬</a>`;

const SHARED_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
*{box-sizing:border-box;}
body{font-family:'Cairo',sans-serif !important;}
.announce-bar{background:#e63946;color:white;text-align:center;padding:9px 16px;font-size:0.85rem;font-weight:600;font-family:'Cairo',sans-serif;}
.site-header{background:linear-gradient(135deg,#023e8a 0%,#0077b6 60%,#00b4d8 100%);color:white;position:sticky;top:0;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.2);}
.header-inner{max-width:1200px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:white;}
.brand-logo{width:42px;height:42px;background:rgba(255,255,255,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.brand-text{font-size:1.15rem;font-weight:900;display:block;}
.brand-sub{font-size:0.62rem;opacity:0.8;display:block;}
.main-nav{display:flex;gap:4px;flex-wrap:wrap;}
.nav-link{color:white;text-decoration:none;font-weight:600;padding:6px 10px;border-radius:8px;font-size:0.82rem;transition:background 0.2s;font-family:'Cairo',sans-serif;white-space:nowrap;}
.nav-link:hover{background:rgba(255,255,255,0.18);}
.site-footer-global{background:#023e8a;color:white;padding:40px 24px 20px;margin-top:40px;}
.footer-inner-global{max-width:1200px;margin:0 auto;}
.footer-grid-global{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:30px;margin-bottom:30px;}
.footer-col-global h4{font-size:1rem;font-weight:700;margin:0 0 14px;color:#48cae4;}
.footer-col-global p{font-size:0.83rem;opacity:0.8;line-height:1.7;margin:0;}
.footer-col-global a{font-size:0.83rem;opacity:0.8;line-height:1.9;text-decoration:none;color:white;display:block;}
.footer-col-global a:hover{opacity:1;color:#90e0ef;}
.footer-bottom-global{border-top:1px solid rgba(255,255,255,0.15);padding-top:16px;text-align:center;font-size:0.78rem;opacity:0.55;}
.wa-fab-global{position:fixed;bottom:24px;right:24px;background:#25D366;color:white;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 20px rgba(37,211,102,0.45);z-index:9998;transition:transform 0.2s;font-size:26px;text-decoration:none;}
.wa-fab-global:hover{transform:scale(1.12);}
@media(max-width:640px){.main-nav .nav-link:nth-child(1),.main-nav .nav-link:nth-child(4){display:none;}.brand-sub{display:none;}}`;

function injectSharedComponents() {
    const styleEl = document.createElement('style');
    styleEl.textContent = SHARED_STYLES;
    document.head.insertBefore(styleEl, document.head.firstChild);

    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = SITE_HEADER;
    document.body.insertBefore(headerDiv, document.body.firstChild);

    const footerDiv = document.createElement('div');
    footerDiv.innerHTML = SITE_FOOTER;
    document.body.appendChild(footerDiv);

    refreshCartCount();
}

function refreshCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('amalk_cart_v1')) || [];
        const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const el = document.getElementById('cart-count');
        if (el) el.innerText = total;
    } catch(e) {}
}

document.addEventListener('DOMContentLoaded', injectSharedComponents);