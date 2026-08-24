/* ==========================================================================
   SENTINEL ENERGY — Reports List (vanilla)
   Lê {product}/manifest.json (gerado por synthesis/publishing/publish_flow.py)
   e renderiza a listagem cronológica descrescente na página de categoria.
   Em caso de manifest vazio/ausente/erro, mantém o empty-state de fallback
   já presente no HTML (degradação graciosa sem JS).
   ========================================================================== */
(function () {
  'use strict';

  function formatBrtDate(value) {
    if (!value) return '';
    // data_referencia vem como "2026-08-24"; gerado_em como ISO com Z.
    // Normaliza para extrair dd/mm/yyyy.
    var s = String(value);
    var datePart = s.indexOf('T') !== -1 ? s.split('T')[0] : s.slice(0, 10);
    var parts = datePart.split('-');
    if (parts.length !== 3) return s;
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderList(container, entries, product) {
    if (!entries || !entries.length) return;
    var list = document.createElement('div');
    list.className = 'reports-list';

    entries.forEach(function (entry) {
      var href = entry.filename || '#';
      var titulo = entry.titulo || 'Briefing ' + (formatBrtDate(entry.data_referencia) || '');
      var dataLabel = formatBrtDate(entry.data_referencia) || formatBrtDate(entry.gerado_em) || '';
      var geradoLabel = formatBrtDate(entry.gerado_em);

      var item = document.createElement('a');
      item.className = 'report-item';
      item.href = href;

      var dateRow = document.createElement('div');
      dateRow.className = 'report-item-date';
      dateRow.textContent = dataLabel;

      var title = document.createElement('div');
      title.className = 'report-item-title';
      title.textContent = titulo;

      item.appendChild(dateRow);
      item.appendChild(title);

      if (geradoLabel && geradoLabel !== dataLabel) {
        var meta = document.createElement('div');
        meta.className = 'report-item-meta';
        meta.textContent = 'Gerado em ' + geradoLabel;
        item.appendChild(meta);
      }

      list.appendChild(item);
    });

    container.innerHTML = '';
    container.appendChild(list);
  }

  function init() {
    var container = document.getElementById('reports-list');
    if (!container) return;

    var product = container.getAttribute('data-product');
    if (!product) return;

    // fetch relativo resolve para {product}/manifest.json (o index.html está
    // em {product}/index.html). Em file:// o fetch é bloqueado — só funciona
    // sob HTTP (GitHub Pages / servidor local).
    fetch('manifest.json', { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (entries) {
        if (!Array.isArray(entries)) return;
        // Ordena por data_referencia desc (já vem assim do pipeline, mas
        // garantimos client-side para resiliência).
        entries.sort(function (a, b) {
          var ka = String(a.data_referencia || a.gerado_em || '');
          var kb = String(b.data_referencia || b.gerado_em || '');
          return kb < ka ? -1 : (kb > ka ? 1 : 0);
        });
        renderList(container, entries, product);
      })
      .catch(function (err) {
        // Mantém o empty-state de fallback. Log silencioso para não poluir
        // console em ambientes sem manifest (ex: file:// preview local).
        if (window.console && console.debug) {
          console.debug('reports-list: manifest indisponível — empty-state mantido (' + err + ')');
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
