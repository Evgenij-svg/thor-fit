export function createRouter(routes, outlet, fallback = '/today') {
  function render() {
    const path = location.hash.slice(1) || fallback;
    const page = routes[path] || routes[fallback];

    outlet.innerHTML = '';
    page(outlet);

    
    document.querySelectorAll('[data-link]').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + path);
    });
  }

  window.addEventListener('hashchange', render);
  render();
}
