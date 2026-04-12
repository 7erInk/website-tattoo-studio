(function () {
  if (localStorage.getItem('cookie_accepted')) return;

  var css = `
    #cookie-banner {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 999999;
      background: #111108; border-top: 1px solid rgba(201,168,76,0.25);
      padding: 1.1rem 1.5rem;
      display: flex; align-items: center; justify-content: space-between;
      gap: 1.5rem; flex-wrap: wrap;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 -8px 32px rgba(0,0,0,0.5);
      animation: cb-slide-up 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    @keyframes cb-slide-up {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);   opacity: 1; }
    }
    #cookie-banner p {
      margin: 0; font-size: 0.8rem; color: rgba(255,255,255,0.65);
      line-height: 1.6; flex: 1; min-width: 200px;
    }
    #cookie-banner a {
      color: #c9a84c; text-decoration: underline;
    }
    #cookie-accept {
      background: linear-gradient(135deg, #c9a84c, #a07828);
      color: #080808; font-weight: 700; font-size: 0.75rem;
      letter-spacing: 0.1em; text-transform: uppercase;
      border: none; border-radius: 8px; padding: 0.65rem 1.4rem;
      cursor: pointer; white-space: nowrap; flex-shrink: 0;
      transition: opacity 0.2s;
    }
    #cookie-accept:hover { opacity: 0.85; }
    @media (max-width: 480px) {
      #cookie-banner { flex-direction: column; align-items: stretch; gap: 0.8rem; }
      #cookie-accept { text-align: center; }
    }
  `;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <p>
      Diese Website verwendet ausschließlich technisch notwendige Cookies.
      Tracking oder Analyse findet nicht statt.
      Mehr Infos in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.
    </p>
    <button id="cookie-accept">Verstanden</button>
  `;
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', function () {
    localStorage.setItem('cookie_accepted', '1');
    var b = document.getElementById('cookie-banner');
    b.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    b.style.transform = 'translateY(100%)';
    b.style.opacity = '0';
    setTimeout(function () { b.remove(); }, 320);
  });
})();
