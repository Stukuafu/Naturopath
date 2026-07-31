(() => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const header = document.querySelector('[data-header]');
  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 10);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 820;
  const showReveals = () => revealItems.forEach(item => item.classList.add('visible'));

  if (prefersReducedMotion || isTouchDevice) {
    showReveals();
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    showReveals();
  }

  document.querySelectorAll('[data-accordion]').forEach(group => {
    group.querySelectorAll('article').forEach(item => {
      const button = item.querySelector('button');
      const panel = item.querySelector('div');
      button.addEventListener('click', () => {
        const open = item.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
        panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '0px';
      });
    });
  });

  const filterGroup = document.querySelector('[data-filter-group]');
  const filterItems = document.querySelectorAll('[data-filter-items] [data-category]');
  filterGroup?.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      filterGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      filterItems.forEach(item => item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter));
    });
  });

  document.querySelectorAll('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const message = form.querySelector('.form-message');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (message) message.textContent = 'Thanks. This concept form is working, but it is not connected to an email or booking system yet.';
      form.reset();
    });
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
