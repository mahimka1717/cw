import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

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

  // Создаём <mask> для анимации открытия доната
  const maskId = `donatMask-${Math.random().toString(36).substr(2, 9)}`;
  const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
  mask.setAttribute('id', maskId);

  // Круг для маски, повернут на -90deg (старт с 12:00)
  const maskCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  maskCircle.setAttribute('cx', radius);
  maskCircle.setAttribute('cy', radius);
  maskCircle.setAttribute('r', radius - donutWidth / 2);
  maskCircle.setAttribute('fill', 'none');
  maskCircle.setAttribute('stroke', 'white');
  maskCircle.setAttribute('stroke-width', donutWidth);
  maskCircle.setAttribute('class', 'donat-anim-stroke');
  maskCircle.setAttribute('style', 'pointer-events:none');
  maskCircle.setAttribute('transform', `rotate(-90 ${radius} ${radius})`);
  mask.appendChild(maskCircle);
  svg.appendChild(mask);

  // Сегменты доната с маской
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
    const seg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    seg.setAttribute('d', pathData);
    seg.setAttribute('fill', item.color);
    seg.setAttribute('stroke', '#fff');
    seg.setAttribute('stroke-width', '0.5');
    seg.setAttribute('mask', `url(#${maskId})`);
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

export function animateDonats(){

  const donats = document.querySelectorAll('.donat-component');

  if (!donats || !donats.length) {
    console.warn('No donat components found');
    return;
  }

  donats.forEach(el => {



    const title = el.querySelector('.donat-title-d');
    const colors = el.querySelectorAll('.donat-legend__color');
    const texts = el.querySelectorAll('.donat-legend__text');
    const svgGroup = el.querySelector('.donat-chart g');
    // Круг внутри <mask> для анимации
    const donutStroke = svgGroup ? svgGroup.querySelector('.donat-anim-stroke') : null;

    // Скрываем элементы перед анимацией
    if (title) gsap.set(title, { opacity: 0 });
    if (colors.length) gsap.set(colors, { scaleX: 0, transformOrigin: 'center' });
    if (texts.length) gsap.set(texts, { opacity: 0, x: 15 });
    if (donutStroke) gsap.set(donutStroke, { drawSVG: '0% 0%' });

    let tl = gsap.timeline({ paused: true });

    // Заголовок
    if (title) tl.to(title, { opacity: 1, duration: 1, ease: 'power2.out' });

    // Легенда
    if (colors.length)
      tl.to(colors, {
        scaleX: 1,
        transformOrigin: 'center',
        duration: 0.25,
        stagger: 0.1,
        ease: 'power2.out'
      }, 0.2);
    if (texts.length)
      tl.to(texts, {
        opacity: 1,
        x: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.out'
      }, 0.2);

    // Анимация SVG stroke-бублика
    if (donutStroke) {
      tl.to(donutStroke, {
        drawSVG: '0% 100%',
        duration: 1,
        ease: 'power2.out'
      }, 0.2);
    }

    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => tl.play()
    });
  });



}
