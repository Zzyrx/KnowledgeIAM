// Scripts UI du site — servis en fichier externe pour respecter la CSP stricte
// (script-src 'self', sans 'unsafe-inline'). Chargé sur toutes les pages via
// BaseLayout. Chaque bloc est protégé par une garde d'existence : il ne s'exécute
// que si les éléments concernés sont présents sur la page courante.
(function () {
  'use strict';

  // 1. Progressive enhancement : signaler que JS est actif (retire le fallback no-js).
  document.documentElement.classList.remove('no-js');

  // 2. Menu mobile (hamburger) — présent dans le Header sur toutes les pages.
  var menuBtn = document.getElementById('mobile-menu-btn');
  var menu = document.getElementById('mobile-menu');
  var menuIcon = document.getElementById('menu-icon');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.style.overflow = open ? 'hidden' : '';
      if (menuIcon) {
        menuIcon.setAttribute('d', open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16');
      }
    });
  }

  // 3. Animations au scroll — révèle les éléments .animate-on-scroll quand ils entrent
  //    dans le viewport, avec un filet de sécurité si l'observer ne déclenche pas.
  var animated = document.querySelectorAll('.animate-on-scroll');
  if (animated.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    animated.forEach(function (el) {
      observer.observe(el);
    });

    // Filet de sécurité : tout afficher après 3 s si l'observer n'a rien déclenché.
    setTimeout(function () {
      document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }, 3000);
  }

  // 4. Table des matières mobile (pages guides) — bouton flottant repliable.
  var tocBtn = document.getElementById('toc-toggle');
  var tocPanel = document.getElementById('toc-mobile');
  if (tocBtn && tocPanel) {
    tocBtn.addEventListener('click', function () {
      tocPanel.classList.toggle('hidden');
      if (!tocPanel.classList.contains('hidden')) {
        tocPanel.focus();
      }
    });
    tocPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        tocPanel.classList.add('hidden');
      });
    });
  }
})();
