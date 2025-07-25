// Linechart renderer
export function renderLineChart(el, data) {


 

  if (!el) return;



  
  el.querySelector('.linechart-title').textContent = data.title;
  const list = el.querySelector('.linechart-list');
  list.innerHTML = '';
  data.elements.forEach(item => {


    console.log('renderLineChart item:', item);

    const itemDiv = document.createElement('div');
    itemDiv.className = 'linechart-list__item';
    // Text
    const textSpan = document.createElement('span');
    textSpan.className = 'linechart-list__text';
    textSpan.textContent = item.text;
    // Bar
    const barWrap = document.createElement('div');
    barWrap.className = 'linechart-list__barwrap';
    const barSpan = document.createElement('span');
    barSpan.className = 'linechart-list__bar';
    barSpan.style.width = item.val + '%';
    barSpan.style.background = item.color;
    barSpan.style.borderRadius = '50px';
    barWrap.appendChild(barSpan);
    // Value
    const valSpan = document.createElement('span');
    valSpan.className = 'linechart-list__val';
    valSpan.textContent = item.val + '%';
    // Layout
    itemDiv.appendChild(textSpan);
    itemDiv.appendChild(barWrap);
    itemDiv.appendChild(valSpan);
    list.appendChild(itemDiv);


    
  });

   
}
