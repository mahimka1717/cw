
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
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

export function animateLineChart() {




  const charts = document.querySelectorAll('.linechart-component');
  if (!charts.length) return;

  charts.forEach(chart => {
    const title = chart.querySelector('.linechart-title');
    const items = chart.querySelectorAll('.linechart-list__item');
    const texts = chart.querySelectorAll('.linechart-list__text');
    const bars = chart.querySelectorAll('.linechart-list__bar');
    const vals = chart.querySelectorAll('.linechart-list__val');
    const lines = chart.querySelectorAll('.linechart-line');

    // Скрываем всё перед анимацией
    if (title) gsap.set(title, { opacity: 0 });
    if (texts.length) gsap.set(texts, { opacity: 0 });
    if (bars.length) gsap.set(bars, { scaleX: 0, transformOrigin: '0 50%' });
    if (vals.length) gsap.set(vals, { opacity: 0 });
    if (lines.length) gsap.set(lines, { opacity: 0 });

    let tl = gsap.timeline({ paused: true });

    // Заголовок
    if (title) tl.to(title, { opacity: 1, duration: 1, ease: 'power2.out' });

    // Элементы
    tl.to(texts, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, 0.2);

    tl.to(lines, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, 0.2);

    tl.to(bars, {
      scaleX: 1,
      transformOrigin: '0 50%',
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out'
    }, 0.2);

    // Числа с анимацией от 0% до значения
    vals.forEach((valSpan, idx) => {
      const target = parseInt(valSpan.textContent);
      tl.to(valSpan, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onStart: () => {
          gsap.fromTo(valSpan, {
            innerText: 0
          }, {
            innerText: target,
            duration: 0.7,
            roundProps: 'innerText',
            onUpdate: function() {
              valSpan.textContent = Math.round(this.targets()[0].innerText) + '%';
            }
          });
        }
      }, 0.2 + idx * 0.2);
    });

    ScrollTrigger.create({
      trigger: chart,
      start: 'top 75%',
      once: true,
      onEnter: () => tl.play()
    });
  });
}