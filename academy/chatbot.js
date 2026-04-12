(function () {
  'use strict';

  var CALENDLY_URL = 'https://calendly.com/besprechungst';
  var API_URL      = 'https://academy.7erink.com/chat.php';
  var MAIL_URL     = 'https://7erink.com/send-mail.php';

  var messages        = [];   // vollständiger Verlauf für API
  var isOpen          = false;
  var isTyping        = false;
  var directFormActive= false;

  // ─────────────────────────────────────────────────────────────
  // STYLES
  // ─────────────────────────────────────────────────────────────
  var css = `
    #cb-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 99999;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #c9a84c, #f5e099, #c9a84c);
      border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(201,168,76,0.5);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; transition: transform 0.2s, box-shadow 0.2s;
      animation: cb-pulse 2.5s infinite;
    }
    #cb-btn:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(201,168,76,0.7); }
    #cb-btn.open  { animation: none; }
    @keyframes cb-pulse {
      0%,100% { box-shadow: 0 4px 20px rgba(201,168,76,0.5); }
      50%      { box-shadow: 0 4px 32px rgba(201,168,76,0.9); }
    }
    #cb-badge {
      position: absolute; top: -4px; right: -4px;
      background: #e53e3e; color: #fff; border-radius: 50%;
      width: 20px; height: 20px; font-size: 0.65rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid #080808;
    }
    #cb-window {
      position: fixed; bottom: 96px; right: 24px; z-index: 99998;
      width: 360px; max-width: calc(100vw - 32px);
      background: #0e0e0e; border: 1px solid rgba(201,168,76,0.25);
      border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.8);
      display: flex; flex-direction: column; overflow: hidden;
      transform: translateY(20px) scale(0.95); opacity: 0;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s;
      pointer-events: none; max-height: 520px;
    }
    #cb-window.open { transform: translateY(0) scale(1); opacity: 1; pointer-events: all; }
    #cb-header {
      background: linear-gradient(135deg, #1a1500, #0e0e0e);
      border-bottom: 1px solid rgba(201,168,76,0.2);
      padding: 14px 16px; display: flex; align-items: center; gap: 10px;
    }
    #cb-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(135deg, #c9a84c, #8b6914);
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; flex-shrink: 0; position: relative;
    }
    #cb-avatar::after {
      content: ''; position: absolute; bottom: 1px; right: 1px;
      width: 10px; height: 10px; background: #48bb78;
      border-radius: 50%; border: 2px solid #0e0e0e;
    }
    #cb-header-info { flex: 1; }
    #cb-header-name   { font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 600; color: #f2f2f2; }
    #cb-header-status { font-size: 0.68rem; color: #48bb78; margin-top: 1px; }
    #cb-close {
      background: none; border: none; color: rgba(255,255,255,0.4);
      cursor: pointer; font-size: 1.1rem; padding: 4px; line-height: 1;
      transition: color 0.2s;
    }
    #cb-close:hover { color: #c9a84c; }
    #cb-messages {
      flex: 1; overflow-y: auto; padding: 16px; display: flex;
      flex-direction: column; gap: 10px; min-height: 240px; max-height: 320px;
      scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.2) transparent;
    }
    #cb-messages::-webkit-scrollbar       { width: 4px; }
    #cb-messages::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }
    .cb-msg {
      max-width: 85%; padding: 10px 13px; border-radius: 12px;
      font-family: 'Inter', sans-serif; font-size: 0.82rem; line-height: 1.55;
      animation: cb-fadein 0.3s ease;
    }
    @keyframes cb-fadein { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
    .cb-msg.bot {
      background: #1a1a1a; color: #e0e0e0; border: 1px solid rgba(255,255,255,0.06);
      border-bottom-left-radius: 3px; align-self: flex-start;
    }
    .cb-msg.user {
      background: linear-gradient(135deg, #c9a84c22, #c9a84c33);
      border: 1px solid rgba(201,168,76,0.3);
      color: #f2f2f2; border-bottom-right-radius: 3px; align-self: flex-end;
    }
    .cb-calendly-btn {
      display: inline-block; margin-top: 8px;
      background: linear-gradient(135deg, #c9a84c, #a07828);
      color: #080808 !important; font-weight: 700; font-size: 0.78rem;
      padding: 9px 16px; border-radius: 8px; text-decoration: none;
      transition: opacity 0.2s; letter-spacing: 0.03em;
      cursor: pointer !important; pointer-events: all !important;
      position: relative; z-index: 99999;
    }
    .cb-calendly-btn:hover { opacity: 0.85; }
    .cb-direct-btn {
      display: inline-block; margin-top: 8px; margin-left: 6px;
      background: transparent; border: 1px solid rgba(201,168,76,0.5);
      color: #c9a84c !important; font-weight: 600; font-size: 0.78rem;
      padding: 9px 16px; border-radius: 8px; text-decoration: none;
      transition: background 0.2s; letter-spacing: 0.03em;
      cursor: pointer !important; pointer-events: all !important;
      position: relative; z-index: 99999;
    }
    .cb-direct-btn:hover { background: rgba(201,168,76,0.1); }
    .cb-preview-feedback-btn {
      background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.4);
      color: #c9a84c; border-radius: 6px; padding: 5px 10px;
      font-size: 0.75rem; cursor: pointer; font-family: 'Inter', sans-serif;
      transition: background 0.2s;
    }
    .cb-preview-feedback-btn:hover { background: rgba(201,168,76,0.3); }
    .cb-form { margin-top: 10px; display: flex; flex-direction: column; gap: 8px; }
    .cb-form select { -webkit-appearance: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c9a84c' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 30px !important; cursor: pointer; }
    .cb-form input, .cb-form select, .cb-form textarea {
      background: #1a1a1a; border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px; padding: 8px 10px; color: #f2f2f2;
      font-family: 'Inter', sans-serif; font-size: 0.8rem; outline: none;
      transition: border-color 0.2s; width: 100%; box-sizing: border-box;
    }
    .cb-form input:focus, .cb-form select:focus, .cb-form textarea:focus { border-color: rgba(201,168,76,0.4); }
    .cb-form input::placeholder, .cb-form textarea::placeholder { color: #555; }
    .cb-form textarea { min-height: 70px; resize: none; }
    .cb-form-img-label {
      display: flex; align-items: center; gap: 6px;
      background: #1a1a1a; border: 1px dashed rgba(201,168,76,0.3);
      border-radius: 8px; padding: 8px 10px; cursor: pointer;
      color: #888; font-size: 0.78rem; transition: border-color 0.2s;
    }
    .cb-form-img-label:hover { border-color: rgba(201,168,76,0.6); color: #c9a84c; }
    .cb-form-img-label input { display: none; }
    .cb-form-img-preview { max-width: 100%; border-radius: 6px; margin-top: 4px; display: none; }
    .cb-form-submit {
      background: linear-gradient(135deg, #c9a84c, #a07828);
      color: #080808; font-weight: 700; font-size: 0.82rem;
      border: none; border-radius: 8px; padding: 10px;
      cursor: pointer; transition: opacity 0.2s;
    }
    .cb-form-submit:hover    { opacity: 0.85; }
    .cb-form-submit:disabled { opacity: 0.4; cursor: default; }
    .cb-typing {
      display: flex; align-items: center; gap: 4px;
      padding: 10px 14px; background: #1a1a1a;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px; border-bottom-left-radius: 3px;
      align-self: flex-start; animation: cb-fadein 0.3s ease;
    }
    .cb-typing span {
      width: 7px; height: 7px; background: #c9a84c; border-radius: 50%;
      animation: cb-bounce 1.2s infinite;
    }
    .cb-typing span:nth-child(2) { animation-delay: 0.2s; }
    .cb-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes cb-bounce {
      0%,60%,100% { transform: translateY(0); opacity: 0.4; }
      30%          { transform: translateY(-5px); opacity: 1; }
    }
    #cb-input-wrap {
      padding: 12px; border-top: 1px solid rgba(255,255,255,0.06);
      display: flex; gap: 8px; background: #0e0e0e;
    }
    #cb-input {
      flex: 1; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px; padding: 9px 12px; color: #f2f2f2;
      font-family: 'Inter', sans-serif; font-size: 0.82rem;
      outline: none; resize: none; max-height: 80px;
      transition: border-color 0.2s;
    }
    #cb-input:focus       { border-color: rgba(201,168,76,0.4); }
    #cb-input::placeholder{ color: #555; }
    #cb-send {
      width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, #c9a84c, #a07828);
      border: none; cursor: pointer; color: #080808; font-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.2s; align-self: flex-end;
    }
    #cb-send:hover    { opacity: 0.85; }
    #cb-send:disabled { opacity: 0.4; cursor: default; }
    #cb-attach {
      width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
      background: transparent; border: 1px solid rgba(201,168,76,0.3);
      cursor: pointer; color: #c9a84c; font-size: 1.05rem;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, border-color 0.2s; align-self: flex-end;
    }
    #cb-attach:hover { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.6); }
    #cb-attach.has-img { background: rgba(201,168,76,0.2); border-color: #c9a84c; }
    #cb-attach-input { display: none; }
    #cb-attach-thumb {
      width: 100%; padding: 4px 12px 0;
      display: none; align-items: center; gap: 8px;
    }
    #cb-attach-thumb.visible { display: flex; }
    #cb-attach-thumb img { width: 36px; height: 36px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(201,168,76,0.4); }
    #cb-attach-thumb span { font-size: 0.72rem; color: #c9a84c; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    #cb-attach-remove { background: none; border: none; color: rgba(255,255,255,0.4); cursor: pointer; font-size: 0.85rem; padding: 2px 4px; }
    #cb-attach-remove:hover { color: #e53e3e; }
    @media (max-width: 480px) {
      #cb-window {
        left: 8px !important; right: 8px !important;
        width: auto !important; max-width: none !important;
        bottom: 80px; max-height: 420px;
      }
      #cb-btn { right: 12px; bottom: 12px; }
      #cb-messages { min-height: 100px; max-height: 180px; }
    }
  `;

  // ─────────────────────────────────────────────────────────────
  // HTML
  // ─────────────────────────────────────────────────────────────
  var html = `
    <div id="cb-window">
      <div id="cb-header">
        <div id="cb-avatar">💬</div>
        <div id="cb-header-info">
          <div id="cb-header-name">Maya · 7er Ink Studio</div>
          <div id="cb-header-status">● Online – antwortet sofort</div>
        </div>
        <button id="cb-close" aria-label="Chat schließen">✕</button>
      </div>
      <div id="cb-messages"></div>
      <div id="cb-attach-thumb">
        <img id="cb-attach-thumb-img" src="" alt="">
        <span id="cb-attach-thumb-name"></span>
        <button id="cb-attach-remove" title="Bild entfernen">✕</button>
      </div>
      <div id="cb-input-wrap">
        <button id="cb-attach" aria-label="Bild anhängen" title="Referenzbild hochladen">📎</button>
        <input id="cb-attach-input" type="file" accept="image/*">
        <textarea id="cb-input" placeholder="Schreib uns..." rows="1"></textarea>
        <button id="cb-send" aria-label="Senden">➤</button>
      </div>
    </div>
    <button id="cb-btn" aria-label="Chat öffnen">
      <span id="cb-btn-icon">💬</span>
      <div id="cb-badge">1</div>
    </button>
  `;

  // Inject styles & HTML
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  // ─────────────────────────────────────────────────────────────
  // DOM REFS
  // ─────────────────────────────────────────────────────────────
  var win          = document.getElementById('cb-window');
  var btn          = document.getElementById('cb-btn');
  var btnIcon      = document.getElementById('cb-btn-icon');
  var badge        = document.getElementById('cb-badge');
  var msgs         = document.getElementById('cb-messages');
  var input        = document.getElementById('cb-input');
  var sendBtn      = document.getElementById('cb-send');
  var closeBtn     = document.getElementById('cb-close');
  var attachBtn    = document.getElementById('cb-attach');
  var attachInput  = document.getElementById('cb-attach-input');
  var attachThumb  = document.getElementById('cb-attach-thumb');
  var attachThumbImg  = document.getElementById('cb-attach-thumb-img');
  var attachThumbName = document.getElementById('cb-attach-thumb-name');
  var attachRemove = document.getElementById('cb-attach-remove');

  attachBtn.addEventListener('click', function() { attachInput.click(); });

  attachInput.addEventListener('change', function() {
    var file = this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      customerRefImage = e.target.result;
      attachThumbImg.src = e.target.result;
      attachThumbName.textContent = file.name;
      attachThumb.classList.add('visible');
      attachBtn.classList.add('has-img');
      // Auch das frühe Upload-Feld aktualisieren, falls sichtbar
      var earlyPrev = document.getElementById('cb-ref-preview-early');
      if (earlyPrev) {
        earlyPrev.src = e.target.result;
        earlyPrev.style.display = 'block';
        var status = document.getElementById('cb-ref-early-status');
        if (status) status.style.display = 'block';
      }
    };
    reader.readAsDataURL(file);
    attachInput.value = '';
  });

  attachRemove.addEventListener('click', function() {
    customerRefImage = null;
    attachThumb.classList.remove('visible');
    attachBtn.classList.remove('has-img');
    attachThumbImg.src = '';
    attachThumbName.textContent = '';
  });

  // ─────────────────────────────────────────────────────────────
  // SCROLL: zeigt den ANFANG der neuen Nachricht
  // ─────────────────────────────────────────────────────────────
  function scrollToNew(el) {
    setTimeout(function () {
      var top = el.offsetTop - msgs.offsetTop - 8;
      msgs.scrollTo({ top: top, behavior: 'smooth' });
    }, 50);
  }

  // ─────────────────────────────────────────────────────────────
  // NACHRICHTEN ANZEIGEN
  // ─────────────────────────────────────────────────────────────
  function removeTyping() {
    var t = msgs.querySelector('.cb-typing');
    if (t) t.remove();
  }

  function addMessage(text, role) {
    removeTyping();
    var div = document.createElement('div');
    div.className = 'cb-msg ' + role;
    div.textContent = text;
    msgs.appendChild(div);
    scrollToNew(div);
    return div;
  }

  function showTyping() {
    removeTyping();
    var div = document.createElement('div');
    div.className = 'cb-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    scrollToNew(div);
  }

  // ─────────────────────────────────────────────────────────────
  // userMessageCount: Anzahl User-Nachrichten im messages-Array
  // ─────────────────────────────────────────────────────────────
  function userMessageCount() {
    return messages.filter(function (m) { return m.role === 'user'; }).length;
  }

  // ─────────────────────────────────────────────────────────────
  // BOT-ANTWORT VERARBEITEN
  // ─────────────────────────────────────────────────────────────
  function showBotMessage(rawText) {
    removeTyping();

    // Escaped Brackets normalisieren
    var text = rawText
      .replace(/\\\[FORM\\\]/g,     '[FORM]')
      .replace(/\\\[PREVIEW\\\]/g,  '[PREVIEW]')
      .replace(/\\\[CALENDLY\\\]/g, '[CALENDLY]');

    // Erkennen – [FORM] muss am Ende stehen (regex erlaubt Leerzeichen/Newline danach)
    var hasForm     = /\[FORM\]\s*$/i.test(text);
    var hasCalendly = /\[CALENDLY\]\s*$/i.test(text);

    // Platzhalter aus Anzeigetext entfernen
    var displayText = text
      .replace(/\[FORM\]/gi,     '')
      .replace(/\[CALENDLY\]/gi, '')
      .trim();

    var div = document.createElement('div');
    div.className = 'cb-msg bot';
    div.textContent = displayText;

    if (hasForm && !directFormActive) {
      msgs.appendChild(div);
      scrollToNew(div);
      showDirectForm();
      return;
    }

    if (hasCalendly) {
      var br = document.createElement('br');
      div.appendChild(br);
      var a = document.createElement('a');
      a.href = CALENDLY_URL;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'cb-direct-btn';
      a.textContent = '📅 Beratungsgespräch buchen';
      div.appendChild(a);
    }

    msgs.appendChild(div);
    scrollToNew(div);

  }

  var customerRefImage = null; // base64 des Kundenbildes

  // ─────────────────────────────────────────────────────────────
  // CHAT-DATEN EXTRAHIEREN (für Formular-Vorfüllung)
  // ─────────────────────────────────────────────────────────────
  function extractFromChat() {
    var chatText = messages.map(function (m) { return m.content; }).join(' ').toLowerCase();
    var result = { artist: '', position: '', groesse: '', stilDetails: '', datum: '', motivSummary: '' };

    // Artist
    if (/\btom\b/.test(chatText))          result.artist = 'Tom';
    else if (/\bpatrick\b/.test(chatText)) result.artist = 'Patrick';
    else if (/\bmel\b/.test(chatText))     result.artist = 'Mel';
    else if (/\bakos\b/.test(chatText) || /farbe|cover.?up|coverup/i.test(chatText)) result.artist = 'Akos';

    // Körperstelle
    var bodyMap = [
      ['oberarm','Oberarm'], ['unterarm','Unterarm'], ['oberschenkel','Oberschenkel'],
      ['schulter','Schulter'], ['rippen','Rippen'], ['rücken','Rücken'],
      ['brust','Brust'], ['bauch','Bauch'], ['wade','Wade'],
      ['nacken','Nacken'], ['hals','Hals'], ['hand','Hand'],
      ['finger','Finger'], ['fuß','Fuß'], ['fuss','Fuß'],
      ['knöchel','Knöchel'], ['ellenbogen','Ellenbogen'], ['knie','Knie']
    ];
    for (var i = 0; i < bodyMap.length; i++) {
      if (chatText.includes(bodyMap[i][0])) {
        result.position = bodyMap[i][1];
        if (chatText.includes('link'))  result.position += ' links';
        else if (chatText.includes('recht')) result.position += ' rechts';
        break;
      }
    }

    // Größe
    var cmMatch = chatText.match(/(\d+)\s*cm/);
    if (cmMatch) {
      result.groesse = cmMatch[1] + ' cm';
    } else if (chatText.includes('ganzer oberarm') || chatText.includes('full sleeve')) {
      result.groesse = 'Ganzer Oberarm';
    } else if (chatText.includes('halber oberarm') || chatText.includes('half sleeve')) {
      result.groesse = 'Halber Oberarm';
    } else if (chatText.includes('sleeve')) {
      result.groesse = 'Sleeve';
    } else if (chatText.includes('handteller')) {
      result.groesse = 'Handtellergroß';
    }

    // Stil-Details
    var styleHints = [];
    if (chatText.includes('offen') || chatText.includes('maul') || chatText.includes('zähne')) styleHints.push('Maul offen / Zähne');
    if (chatText.includes('aggressiv'))                  styleHints.push('aggressiv');
    if (chatText.includes('ruhig') || chatText.includes('brav')) styleHints.push('ruhig/majestätisch');
    if (chatText.includes('brüllend'))                   styleHints.push('brüllend');
    if (chatText.includes('schnörkelig') || chatText.includes('kursiv')) styleHints.push('Schrift: schnörkelig/Kursiv');
    if (chatText.includes('druckschrift'))               styleHints.push('Schrift: Druckschrift');
    if (chatText.includes('modern') || chatText.includes('clean')) styleHints.push('Schrift: modern/clean');
    if (chatText.includes('schwarz') && chatText.includes('grau')) styleHints.push('Schwarzgrau');
    if (chatText.includes('farbe') || chatText.includes('bunt')) styleHints.push('Farbe');
    if (chatText.includes('artist entscheidet') || chatText.includes('ist mir egal') || chatText.includes('egal')) styleHints.push('Artist entscheidet');
    result.stilDetails = styleHints.join(', ');

    // Datum
    var dateKeywords = ['nächste woche','nächsten monat','nächstes monat','flexibel','keine eile','so schnell','asap','dringend'];
    for (var d = 0; d < dateKeywords.length; d++) {
      if (chatText.includes(dateKeywords[d])) { result.datum = dateKeywords[d]; break; }
    }
    var monthNames = ['januar','februar','märz','april','mai','juni','juli','august','september','oktober','november','dezember'];
    for (var mo = 0; mo < monthNames.length; mo++) {
      if (chatText.includes(monthNames[mo])) {
        result.datum = monthNames[mo].charAt(0).toUpperCase() + monthNames[mo].slice(1);
        break;
      }
    }

    // Motiv-Zusammenfassung: alle User-Nachrichten
    result.motivSummary = messages
      .filter(function (m) { return m.role === 'user'; })
      .map(function (m) { return m.content; })
      .join('\n');

    return result;
  }

  // ─────────────────────────────────────────────────────────────
  // ANFRAGEFORMULAR ANZEIGEN
  // ─────────────────────────────────────────────────────────────
  function showDirectForm() {
    if (directFormActive) return;
    directFormActive = true;

    var ex = extractFromChat();

    // HTML-Sonderzeichen escapen für value-Attribute
    function esc(str) {
      return (str || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    var formDiv = document.createElement('div');
    formDiv.className = 'cb-msg bot';
    formDiv.innerHTML = `
      <div style="font-size:0.82rem;margin-bottom:8px;color:#e0e0e0;font-weight:600;">Tattoo-Anfrage – alles bereits vorausgefüllt 🖤</div>
      <div class="cb-form">
        <input id="cbf-name"     type="text"  placeholder="Dein Name *">
        <input id="cbf-phone"    type="tel"   placeholder="Deine Telefonnummer *">
        <input id="cbf-email"    type="email" placeholder="Deine E-Mail *">
        <select id="cbf-artist">
          <option value="">Artist auswählen *</option>
          <option value="Tom"     ${ex.artist === 'Tom'     ? 'selected' : ''}>Tom – Black & Grey Realismus</option>
          <option value="Patrick" ${ex.artist === 'Patrick' ? 'selected' : ''}>Patrick – Fineline / Lettering</option>
          <option value="Mel"     ${ex.artist === 'Mel'     ? 'selected' : ''}>Mel – Handpoke</option>
          <option value="Akos"    ${ex.artist === 'Akos'    ? 'selected' : ''}>Akos – Farbe & Cover-Ups (Gast-Artist)</option>
          <option value="Egal"    ${!ex.artist              ? 'selected' : ''}>Egal / Artist entscheidet</option>
        </select>
        <input id="cbf-position"   type="text" placeholder="Körperstelle (z.B. Unterarm links) *"    value="${esc(ex.position)}">
        <input id="cbf-groesse"    type="text" placeholder="Ungefähre Größe (z.B. 10 cm)"            value="${esc(ex.groesse)}">
        <textarea id="cbf-motiv"   rows="3"    placeholder="Motiv &amp; Beschreibung *">${esc(ex.motivSummary)}</textarea>
        <input id="cbf-stildetails" type="text" placeholder="Stil-Details (Schriftart, Ausdruck, etc.)" value="${esc(ex.stilDetails)}">
        <input id="cbf-datum"      type="text" placeholder="Gewünschter Zeitraum (z.B. Mai, flexibel)" value="${esc(ex.datum)}">
        <label class="cb-form-img-label">
          📎 Referenz- / Beispielbild hochladen (optional)
          <input id="cbf-img" type="file" accept="image/*">
        </label>
        <img id="cbf-preview" class="cb-form-img-preview" alt="Vorschau">
        <div style="font-size:0.7rem;color:#888;margin-top:-4px;">Hinweis: Vor der Terminvergabe wird eine Anzahlung per PayPal fällig.</div>
        <div id="cbf-error" style="color:#e53e3e;font-size:0.75rem;display:none;">Bitte alle Pflichtfelder ausfüllen.</div>
        <button class="cb-form-submit" id="cbf-submit">Anfrage absenden →</button>
      </div>
    `;
    msgs.appendChild(formDiv);
    scrollToNew(formDiv);

    // Bild-Vorschau im Formular
    document.getElementById('cbf-img').addEventListener('change', function () {
      var file = this.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        var prev = document.getElementById('cbf-preview');
        prev.src = e.target.result;
        prev.style.display = 'block';
      };
      reader.readAsDataURL(file);
    });

    // Formular absenden
    document.getElementById('cbf-submit').addEventListener('click', function () {
      var name        = document.getElementById('cbf-name').value.trim();
      var phone       = document.getElementById('cbf-phone').value.trim();
      var email       = document.getElementById('cbf-email').value.trim();
      var artist      = document.getElementById('cbf-artist').value;
      var motiv       = document.getElementById('cbf-motiv').value.trim();
      var position    = document.getElementById('cbf-position').value.trim();
      var groesse     = document.getElementById('cbf-groesse').value.trim();
      var stildetails = document.getElementById('cbf-stildetails').value.trim();
      var datum       = document.getElementById('cbf-datum').value.trim();
      var imgFile     = document.getElementById('cbf-img').files[0];
      var errEl       = document.getElementById('cbf-error');

      if (!name || !phone || !email || !artist || !motiv || !position) {
        errEl.textContent = 'Bitte alle Pflichtfelder ausfüllen.';
        errEl.style.display = 'block';
        return;
      }
      errEl.style.display = 'none';

      var submitBtn = document.getElementById('cbf-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet...';

      // Chat-Verlauf zusammenbauen
      var chatSummary = messages.map(function (m) {
        return (m.role === 'user' ? 'Kunde: ' : 'Maya: ') + m.content;
      }).join('\n');

      function doSend() {
        var payload = {
          name:        name,
          email:       email,
          phone:       phone,
          artist:      artist,
          position:    position,
          groesse:     groesse,
          motiv:       motiv,
          stildetails: stildetails,
          datum:       datum,
          chatlog:     messages.map(function(m) {
            return (m.role === 'user' ? 'Kunde: ' : 'Maya: ') + m.content;
          }).join('\n').substring(0, 5000)
        };

        fetch(MAIL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        .then(function(r) { return r.json(); })
        .then(function(d) {
          if (d.success) {
            formDiv.innerHTML = '<div style="color:#48bb78;font-size:0.85rem;padding:4px 0;">Anfrage gesendet! Wir melden uns so schnell wie moeglich bei dir.</div>';
            directFormActive = false;
            scrollToNew(formDiv);
          } else {
            onSendError();
          }
        })
        .catch(function() { onSendError(); });
      }

      function onSendError() {
        var btn2 = document.getElementById('cbf-submit');
        if (btn2) { btn2.disabled = false; btn2.textContent = 'Erneut versuchen →'; }
        var err2 = document.getElementById('cbf-error');
        if (err2) {
          err2.innerHTML = 'Fehler beim Senden. Schreib uns direkt: <a href="mailto:info@7erink.com" style="color:#c9a84c;">info@7erink.com</a>';
          err2.style.display = 'block';
        }
      }

      doSend();
    });
  }

  // ─────────────────────────────────────────────────────────────
  // CHAT ÖFFNEN / SCHLIEßEN
  // ─────────────────────────────────────────────────────────────
  function toggleChat() {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    btn.classList.toggle('open', isOpen);
    btnIcon.textContent = isOpen ? '✕' : '💬';
    badge.style.display = 'none';
    if (isOpen) {
      setTimeout(function () { input.focus(); }, 300);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // NACHRICHT SENDEN
  // ─────────────────────────────────────────────────────────────
  async function sendMessage() {
    var text = input.value.trim();
    if ((!text && !customerRefImage) || isTyping) return;

    // Wenn Bild angehängt: Hinweis für die KI hinzufügen
    var apiText = text || '';
    var imgAlreadyMentioned = messages.some(function(m) { return m.content && m.content.indexOf('[Referenzbild hochgeladen]') !== -1; });
    if (customerRefImage && !imgAlreadyMentioned) {
      apiText = (text ? text + ' ' : '') + '[Referenzbild hochgeladen]';
    }
    if (!apiText) apiText = text;

    // Nachricht anzeigen – mit Bild falls angehängt
    var msgDiv = document.createElement('div');
    msgDiv.className = 'cb-msg user';
    if (customerRefImage && !messages.some(function(m) { return m.content && m.content.indexOf('[Referenzbild hochgeladen]') !== -1; })) {
      var imgEl = document.createElement('img');
      imgEl.src = customerRefImage;
      imgEl.style.cssText = 'max-width:100%;border-radius:8px;margin-bottom:6px;display:block;';
      msgDiv.appendChild(imgEl);
    }
    if (text) {
      var textNode = document.createElement('span');
      textNode.textContent = text;
      msgDiv.appendChild(textNode);
    }
    msgs.appendChild(msgDiv);
    scrollToNew(msgDiv);

    messages.push({ role: 'user', content: apiText });
    input.value = '';
    input.style.height = 'auto';

    // Thumbnail zurücksetzen nach dem Senden
    if (attachThumb.classList.contains('visible')) {
      attachThumb.classList.remove('visible');
      attachBtn.classList.remove('has-img');
      attachThumbImg.src = '';
      attachThumbName.textContent = '';
    }

    sendBtn.disabled = true;
    isTyping = true;
    showTyping();

    try {
      var res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages })
      });
      var data = await res.json();
      var reply = data.message || 'Entschuldigung, kurze Störung – versuch es gleich nochmal!';
      messages.push({ role: 'assistant', content: reply });

      // Realistischer Tipp-Delay (1,5–3,5 s)
      var typingDelay = Math.min(Math.max(reply.length * 18, 1500), 3500);
      await new Promise(function (resolve) { setTimeout(resolve, typingDelay); });

      showBotMessage(reply);

    } catch (e) {
      removeTyping();
      addMessage('Kurze technische Störung – schreib uns direkt: info@7erink.com oder ruf uns an: 08247 3668967', 'bot');
    }

    isTyping = false;
    sendBtn.disabled = false;
    input.focus();
  }

  // ─────────────────────────────────────────────────────────────
  // EVENTS
  // ─────────────────────────────────────────────────────────────
  btn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);
  sendBtn.addEventListener('click', sendMessage);

  function onEnterDefault(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }
  input.addEventListener('keydown', onEnterDefault);

  input.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });

  // Mobile: Tastatur öffnet sich → Chat-Fenster fixieren
  if ('visualViewport' in window) {
    window.visualViewport.addEventListener('resize', function () {
      var cbWin = document.getElementById('cb-window');
      if (!cbWin || !cbWin.classList.contains('open')) return;
      if (window.innerWidth <= 480) {
        var vvh = window.visualViewport.height;
        cbWin.style.bottom = '80px';
        cbWin.style.maxHeight = (vvh - 100) + 'px';
        var msgs = document.getElementById('cb-messages');
        if (msgs) {
          msgs.style.maxHeight = Math.max(80, vvh - 280) + 'px';
          msgs.scrollTop = msgs.scrollHeight;
        }
      }
    });
  }
  input.addEventListener('focus', function () {
    if (window.innerWidth <= 480) {
      setTimeout(function () {
        var msgs = document.getElementById('cb-messages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
      }, 400);
    }
  });

})();
