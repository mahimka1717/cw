// Multibar renderer
export function renderMultibar(el, data) {
  if (!el) return;
  if (el.querySelector('.multibar-title')) {
    el.querySelector('.multibar-title').textContent = data.title;
  }
  const legend = el.querySelector('.multibar-legend');
  legend.innerHTML = '';

  data.legend.forEach(item => {
    const legendItem = document.createElement('div');
    legendItem.className = 'multibar-legend__item';
    const colorSpan = document.createElement('span');
    colorSpan.className = 'multibar-legend__color';
    colorSpan.style.background = item.color;
    const textSpan = document.createElement('span');
    textSpan.className = 'multibar-legend__text';
    textSpan.textContent = item.text;
    legendItem.appendChild(colorSpan);
    legendItem.appendChild(textSpan);
    legend.appendChild(legendItem);
  });
  const list = el.querySelector('.multibar-list');
  list.innerHTML = '';
  data.elements.forEach(element => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'multibar-list__item';
    const textSpan = document.createElement('span');
    textSpan.className = 'multibar-list__text';
    textSpan.textContent = element.text;
    const barWrap = document.createElement('div');
    barWrap.className = 'multibar-list__barwrap';
    element.vals.forEach((val, idx) => {
      const barSpan = document.createElement('span');
      barSpan.className = 'multibar-list__bar';
      barSpan.style.width = val + '%';
      barSpan.style.background = data.legend[idx].color;
      barSpan.style.borderRadius = '50%';
      barSpan.style.position = 'absolute';
      barSpan.style.left = 0;
      barSpan.style.top = 0;
      barWrap.appendChild(barSpan);
    });
    barWrap.style.position = 'relative';
    barWrap.style.height = '24px';
    barWrap.style.width = '100%';
    itemDiv.appendChild(textSpan);
    itemDiv.appendChild(barWrap);
    list.appendChild(itemDiv);
  });
}
