/* =========================================================
   MAJD — PORTFOLIO SCRIPT
   1. Menu mobile (abrir/fechar)
   2. Fecha o menu ao clicar em um link
   3. Animação de revelar ao rolar a página (scroll reveal)
   4. Envio do formulário de contato (mock, sem backend)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollReveal();
  initContactForm();
});

/* ---------- 1 & 2. Menu mobile ---------- */
function initMobileNav() {
  const header = document.querySelector('.site-header');
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');

  if (!toggle || !nav || !header) return;

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu automaticamente ao clicar em qualquer link
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- 3. Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  // Respeita quem prefere menos animação: mostra tudo direto
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- 4. Formulário de contato ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Preencha todos os campos antes de enviar.';
      return;
    }

    // Aqui é onde você conectaria um backend real (ex: fetch para uma API,
    // um serviço como Formspree, ou um endpoint próprio).
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Formulário pronto para envio:', data);

    status.textContent = 'Mensagem enviada! Retornamos em breve.';
    form.reset();
  });
}
