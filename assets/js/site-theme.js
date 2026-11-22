(() => {
  const root = document.documentElement;
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  const updateButton = () => {
    const dark = root.dataset.theme === 'dark';
    button.textContent = dark ? 'Light mode' : 'Dark mode';
    button.setAttribute('aria-pressed', String(dark));
    button.hidden = false;
  };

  button.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    try { localStorage.setItem('site-theme', theme); } catch (_) { /* The toggle also works without storage. */ }
    updateButton();
  });

  window.addEventListener('storage', (event) => {
    if (event.key !== 'site-theme') return;
    root.dataset.theme = event.newValue === 'dark' ? 'dark' : 'light';
    updateButton();
  });
  updateButton();
})();
