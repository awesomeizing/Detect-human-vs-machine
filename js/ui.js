/**
 * ui.js
 * DOM rendering, theme toggle, and result display.
 */

let isDark = true;

/** Toggle between dark and light theme */
function toggleTheme() {
  const app = document.getElementById('app');
  isDark = !isDark;
  app.className = 'app ' + (isDark ? 'dark' : 'light');
  const icon = document.getElementById('themeIcon');
  icon.className = 'ti ' + (isDark ? 'ti-moon' : 'ti-sun');
}

/** Load an example text into the textarea */
function loadEx(type) {
  document.getElementById('textInput').value = examples[type];
  updateCount();
  document.getElementById('textInput').focus();
}

/** Clear the textarea */
function clearText() {
  document.getElementById('textInput').value = '';
  updateCount();
}

/** Update the character/word counter */
function updateCount() {
  const v = document.getElementById('textInput').value;
  const words = v.trim() ? v.trim().split(/\s+/).length : 0;
  document.getElementById('charCount').textContent = v.length + ' chars · ' + words + ' words';
}

/**
 * Render the classification result into the result card.
 * @param {{ isAI: boolean, conf: number, aiPct: number, aiFound: string[], humanFound: string[], words: number, avgLen: string, tokenCount: number }} res
 * @param {string} text - The original input text
 */
function showResult(res, text) {
  const card     = document.getElementById('resultCard');
  const hdr      = document.getElementById('rHeader');
  const icon     = document.getElementById('vIcon');
  const main     = document.getElementById('vMain');
  const conf     = document.getElementById('confScore');
  const bar      = document.getElementById('barFill');
  const confWrap = document.getElementById('confWrap');

  if (res.isAI) {
    hdr.style.background      = isDark ? '#04342C' : '#E1F5EE';
    confWrap.style.background = isDark ? '#04342C' : '#E1F5EE';
    icon.style.background     = isDark ? '#085041' : '#9FE1CB';
    icon.innerHTML = `<i class="ti ti-robot" style="font-size:22px;color:${isDark ? '#5DCAA5' : '#0F6E56'};" aria-hidden="true"></i>`;
    main.style.color = isDark ? '#5DCAA5' : '#0F6E56';
    main.textContent = 'AI-generated';
    conf.style.color = isDark ? '#5DCAA5' : '#0F6E56';
    bar.style.background = '#1D9E75';
  } else {
    hdr.style.background      = isDark ? '#26215C' : '#EEEDFE';
    confWrap.style.background = isDark ? '#26215C' : '#EEEDFE';
    icon.style.background     = isDark ? '#3C3489' : '#CECBF6';
    icon.innerHTML = `<i class="ti ti-user" style="font-size:22px;color:${isDark ? '#AFA9EC' : '#534AB7'};" aria-hidden="true"></i>`;
    main.style.color = isDark ? '#AFA9EC' : '#534AB7';
    main.textContent = 'Human-written';
    conf.style.color = isDark ? '#AFA9EC' : '#534AB7';
    bar.style.background = '#7F77DD';
  }

  conf.textContent = res.conf + '%';
  document.getElementById('statWords').textContent   = res.words;
  document.getElementById('statTokens').textContent  = res.tokenCount;
  document.getElementById('statAvgLen').textContent  = res.avgLen;

  // Render signal tokens
  const grid = document.getElementById('tokGrid');
  grid.innerHTML = '';

  res.aiFound.forEach((t, i) => {
    const el = document.createElement('span');
    el.className = 'tok';
    el.style.cssText = `background:${isDark ? '#04342C' : '#E1F5EE'};color:${isDark ? '#5DCAA5' : '#085041'};border-color:${isDark ? '#0F6E56' : '#9FE1CB'};animation-delay:${i * 50}ms`;
    el.textContent = t;
    grid.appendChild(el);
  });

  res.humanFound.forEach((t, i) => {
    const el = document.createElement('span');
    el.className = 'tok';
    el.style.cssText = `background:${isDark ? '#26215C' : '#EEEDFE'};color:${isDark ? '#AFA9EC' : '#534AB7'};border-color:${isDark ? '#534AB7' : '#AFA9EC'};animation-delay:${(res.aiFound.length + i) * 50}ms`;
    el.textContent = t;
    grid.appendChild(el);
  });

  if (grid.children.length === 0) {
    const el = document.createElement('span');
    el.style.cssText = 'font-size:12px;color:var(--txt3);font-family:Space Mono,monospace;';
    el.textContent = 'No strong signal tokens found';
    grid.appendChild(el);
  }

  card.style.display = 'block';
  setTimeout(() => {
    bar.style.width = (res.isAI ? res.aiPct : (100 - res.aiPct)) + '%';
  }, 80);

  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/** Render the history list */
function renderHistory(history) {
  const wrap = document.getElementById('histWrap');
  const list = document.getElementById('histList');
  if (history.length === 0) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  list.innerHTML = '';
  history.forEach(h => {
    const d   = document.createElement('div');
    d.className = 'hist-item';
    const col = h.res.isAI
      ? (isDark ? '#1D9E75' : '#0F6E56')
      : (isDark ? '#7F77DD' : '#534AB7');
    d.innerHTML = `<div class="hist-dot" style="background:${col}"></div><div class="hist-excerpt">${h.excerpt}</div><div class="hist-verdict" style="color:${col}">${h.res.isAI ? 'AI' : 'Human'} · ${h.res.conf}%</div>`;
    list.appendChild(d);
  });
}
