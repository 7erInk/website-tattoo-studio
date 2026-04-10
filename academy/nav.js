// 7er Ink Academy – Navigation
(function () {
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    // Clone nav to wipe all previously attached inline event listeners
    var fresh = nav.cloneNode(true);
    nav.parentNode.replaceChild(fresh, nav);
    nav = fresh;

    // ── Scroll effect ──────────────────────────────────────
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Inject Journal link into Wissen dropdown ──────────
    nav.querySelectorAll('.nav-dropdown').forEach(function (dd) {
      var label = dd.querySelector('a');
      if (label && label.textContent.trim() === 'Wissen') {
        var menu = dd.querySelector('.dropdown-menu');
        if (menu && !menu.querySelector('a[href="news.html"]')) {
          var link = document.createElement('a');
          link.href = 'news.html';
          link.textContent = 'Journal & News';
          menu.appendChild(link);
        }
      }
    });

    // ── Desktop dropdown (only inside #nav) ────────────────
    nav.querySelectorAll('.nav-dropdown').forEach(function (dd) {
      dd.addEventListener('click', function (e) {
        // Let clicks on actual links inside the dropdown navigate
        if (e.target.closest('.dropdown-menu')) return;
        e.stopPropagation();
        var isOpen = dd.classList.contains('open');
        nav.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
          d.classList.remove('open');
        });
        if (!isOpen) dd.classList.add('open');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function () {
      nav.querySelectorAll('.nav-dropdown.open').forEach(function (dd) {
        dd.classList.remove('open');
      });
    });

    // ── Mobile menu ────────────────────────────────────────
    var burger = document.getElementById('burger');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileClose = document.getElementById('mobileClose');

    if (burger && mobileMenu) {
      burger.addEventListener('click', function () {
        mobileMenu.classList.add('open');
        burger.classList.add('open');
      });
    }
    if (mobileClose && mobileMenu) {
      mobileClose.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        if (burger) burger.classList.remove('open');
      });
    }
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileMenu.classList.remove('open');
          if (burger) burger.classList.remove('open');
        });
      });
    }

    // ── Fade-in observer ───────────────────────────────────
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show all fade-in elements immediately
      document.querySelectorAll('.fade-in').forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
