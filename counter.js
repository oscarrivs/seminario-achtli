(() => {
  const value = document.getElementById('visit-count-value');
  const code = window.ACHTLI_GOATCOUNTER_CODE || '';
  if (!value) return;
  if (!/^[a-z0-9-]+$/i.test(code) || code === 'TU-CODIGO-DE-GOATCOUNTER') {
    value.textContent = 'Se activa al configurar GoatCounter';
    return;
  }
  value.textContent = 'Cargando…';
  const tracker = document.createElement('script');
  tracker.src = 'https://gc.zgo.at/count.js';
  tracker.async = true;
  tracker.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
  tracker.onload = () => {
    if (window.goatcounter && typeof window.goatcounter.visit_count === 'function') {
      value.textContent = '';
      window.goatcounter.visit_count({
        append: '#visit-count-value',
        path: 'TOTAL',
        type: 'html',
        no_branding: true,
        attr: { 'aria-label': 'Total de visitas registradas a la página principal' }
      });
    } else {
      value.textContent = 'No se pudo cargar el contador';
    }
  };
  tracker.onerror = () => { value.textContent = 'Contador no disponible'; };
  document.head.appendChild(tracker);
})();
