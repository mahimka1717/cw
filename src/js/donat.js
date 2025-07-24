// Donat chart renderer
export function renderDonatChart(el, data) {
  const svg = el.querySelector('.donat-chart g');
  if (!svg) {
    console.error('SVG <g> element not found in donat-chart');
    return;
  }
  svg.innerHTML = '';
  const radius = 97;
  const donutWidth = (194 - 150) / 2;
  const innerRadius = radius - donutWidth;
  let startAngle = -Math.PI / 2; // 12 o'clock
  const total = data.elements.reduce((sum, e) => sum + e.val, 0);
  // console.log('renderDonatChart data:', data);
  // console.log('total:', total);
  if (!data.elements || !data.elements.length) {
    console.warn('No elements for donat chart');
    return;
  }

  data.elements.forEach((item, idx) => {
    const angle = (item.val / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const x1 = radius + (radius * Math.cos(startAngle));
    const y1 = radius + (radius * Math.sin(startAngle));
    const x2 = radius + (radius * Math.cos(endAngle));
    const y2 = radius + (radius * Math.sin(endAngle));
    const largeArc = angle > Math.PI ? 1 : 0;
    const pathData = [
      `M ${radius + innerRadius * Math.cos(startAngle)} ${radius + innerRadius * Math.sin(startAngle)}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${radius + innerRadius * Math.cos(endAngle)} ${radius + innerRadius * Math.sin(endAngle)}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${radius + innerRadius * Math.cos(startAngle)} ${radius + innerRadius * Math.sin(startAngle)}`,
      'Z'
    ].join(' ');
    // console.log(`segment ${idx}:`, {
    //   val: item.val,
    //   color: item.color,
    //   angle,
    //   startAngle,
    //   endAngle,
    //   pathData
    // });
    const seg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    seg.setAttribute('d', pathData);
    seg.setAttribute('fill', item.color);
    seg.setAttribute('stroke', '#fff');
    seg.setAttribute('stroke-width', '2');
    svg.appendChild(seg);
    startAngle = endAngle;
  });

  // Draw inner circle (donut hole)
  const inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  inner.setAttribute('cx', radius);
  inner.setAttribute('cy', radius);
  inner.setAttribute('r', innerRadius);
  inner.setAttribute('fill', 'transparent');
  svg.appendChild(inner);
}

// Usage example:
// import { renderDonatChart } from './donat.js';
// renderDonatChart(document.querySelector('.donat-component'), donatData1);
