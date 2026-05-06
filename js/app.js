/**
 * app.js
 * Entry point: wires up events and orchestrates analysis flow.
 */

let history = [];

/** Kick off analysis when the button is clicked */
function analyze(e) {
  const text  = document.getElementById('textInput').value.trim();
  const errEl = document.getElementById('errMsg');

  if (text.length < 20) {
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  // Ripple effect on the button
  if (e) {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const r    = document.createElement('div');
    r.className = 'btn-ripple';
    const x = e.clientX - rect.left - 15;
    const y = e.clientY - rect.top  - 15;
    r.style.cssText = `left:${x}px;top:${y}px;`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
  }

  // Show loading state
  const btn  = document.getElementById('analyzeBtn');
  const spin = document.getElementById('spinner');
  const txt  = document.getElementById('btnTxt');
  btn.disabled = true;
  spin.style.display = 'block';
  txt.style.opacity  = '0.4';

  // Simulate async processing delay
  setTimeout(() => {
    const res = classify(text);
    showResult(res, text);

    // Update history
    history.unshift({ res, excerpt: text.slice(0, 65) + (text.length > 65 ? '…' : '') });
    if (history.length > 5) history.pop();
    renderHistory(history);

    // Reset button state
    btn.disabled = false;
    spin.style.display = 'none';
    txt.style.opacity  = '1';
  }, 1100);
}

// Wire up the textarea counter on load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('textInput').addEventListener('input', updateCount);
});
