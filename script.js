/* ─── CONTACT FORM (FORMSPREE AJAX) ─── */
(function () {
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('formSubmitBtn');
  const thanks = document.getElementById('formThanks');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending...';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.style.display = 'none';
          thanks.classList.add('visible');
        } else {
          btn.disabled = false;
          btn.textContent = 'Send Message';
          alert('送信に失敗しました。もう一度お試しください。');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('ネットワークエラーが発生しました。');
      });
  });
})();

/* ─── COOKIE CONSENT ─── */
(function () {
  const COOKIE_KEY = 'cookie_consent';
  const banner = document.getElementById('cookie-banner');
  const consent = localStorage.getItem(COOKIE_KEY);

  if (!consent) {
    // 少し遅らせて表示（ページ読み込み直後は避ける）
    setTimeout(() => banner.classList.add('visible'), 1200);
  }

  function hideBanner() {
    banner.classList.remove('visible');
  }

  document.getElementById('cookieAccept').addEventListener('click', function () {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    hideBanner();
    // ここに Google Analytics の初期化コードを追加
    // loadGoogleAnalytics();
  });

  document.getElementById('cookieDecline').addEventListener('click', function () {
    localStorage.setItem(COOKIE_KEY, 'declined');
    hideBanner();
  });
})();

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── MOBILE MENU ─── */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  navbar.classList.toggle('menu-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  navbar.classList.remove('menu-open');
  document.body.style.overflow = '';
}));

/* ─── INTERSECTION OBSERVER — FADE IN ─── */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ─── HERO PARALLAX ─── */
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  if (s < window.innerHeight * 1.2) {
    heroBg.style.transform = `translateY(${s * 0.38}px)`;
  }
}, { passive: true });

/* ─── ACTIVE NAV LINK ─── */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0, rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => activeObserver.observe(s));
