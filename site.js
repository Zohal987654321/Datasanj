/* DATASANJ — shared behaviour for all pages */
(function () {
  'use strict';

  // --- Mobile navigation ---
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Media placeholders: show a tidy panel when a file isn't uploaded yet ---
  function markEmpty(el) {
    var fig = el.closest('.media');
    if (fig) fig.classList.add('is-empty');
  }

  document.querySelectorAll('.media img').forEach(function (img) {
    img.addEventListener('error', function () { markEmpty(img); });
    if (img.complete && img.naturalWidth === 0) markEmpty(img);
  });

  document.querySelectorAll('.media video').forEach(function (v) {
    v.addEventListener('error', function () { markEmpty(v); }, true);
    var src = v.querySelector('source');
    if (src) src.addEventListener('error', function () { markEmpty(v); });
    setTimeout(function () {
      if (!v.videoWidth && v.readyState === 0) markEmpty(v);
    }, 2500);
  });

  // --- Testimonial / contact form (Formspree) ---
  var form = document.querySelector('form[data-ajax="true"]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('successMessage');
      var submit = form.querySelector('button[type="submit"]');
      var original = submit ? submit.textContent : '';
      if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          if (msg) {
            msg.classList.add('show');
            msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          form.reset();
        })
        .catch(function () {
          if (msg) {
            msg.textContent = 'That did not send. Please email d_zohal@datasanj.com directly and I will pick it up.';
            msg.classList.add('show');
          }
        })
        .then(function () {
          if (submit) { submit.disabled = false; submit.textContent = original; }
        });
    });
  }
})();
