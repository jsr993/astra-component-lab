// Общий слой лаборатории: вкладки и сегменты поверх нативного select.
(() => {
  document.querySelectorAll('[data-panel]').forEach(button => {
    button.onclick = () => document.querySelectorAll('[data-panel]').forEach(other => {
      const active = other === button;
      other.setAttribute('aria-pressed', active);
      document.getElementById(other.dataset.panel).hidden = !active;
    });
  });
  for (const select of document.querySelectorAll('select[data-segments], #size, #referenceMode')) {
    const label = select.closest('label');
    const group = document.createElement('div'); group.className = 'segments'; group.setAttribute('role','group');
    group.setAttribute('aria-label',label?.firstChild?.textContent.trim() || select.id);
    (label || select).after(group); select.hidden = true;
    for (const option of select.options) {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = option.textContent;
      button.onclick = () => { select.value = option.value; for(const type of ['input','change']) select.dispatchEvent(new Event(type,{bubbles:true})); };
      group.append(button);
    }
    const sync = () => [...group.children].forEach((b,i) => b.setAttribute('aria-pressed',i === select.selectedIndex));
    select.addEventListener('change',sync); sync();
  }
})();
