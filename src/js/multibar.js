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


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function animateMultibar() {
  const multibars = document.querySelectorAll('.multibar-component');
  if (!multibars.length) return;

  multibars.forEach(el => {
    const title = el.querySelector('.multibar-title');
    const legendColors = el.querySelectorAll('.multibar-legend__color');
    const legendTexts = el.querySelectorAll('.multibar-legend__text');
    const items = el.querySelectorAll('.multibar-list__item');
    const texts = el.querySelectorAll('.multibar-list__text');
    const barwraps = el.querySelectorAll('.multibar-list__barwrap');
    let bars = [];
    barwraps.forEach(wrap => {
      bars = bars.concat(Array.from(wrap.querySelectorAll('.multibar-list__bar')));
    });

    // Скрываем всё перед анимацией
    if (title) gsap.set(title, { opacity: 0 });
    if (legendColors.length) gsap.set(legendColors, { scaleX: 0, transformOrigin: 'center' });
    if (legendTexts.length) gsap.set(legendTexts, { opacity: 0, x: 15 });
    if (texts.length) gsap.set(texts, { opacity: 0 });
    if (bars.length) gsap.set(bars, { scaleX: 0, transformOrigin: '0 50%' });

    let tl = gsap.timeline({ paused: true });

    // Заголовок
    if (title) tl.to(title, { opacity: 1, duration: 1, ease: 'power2.out' });

    // Легенда
    tl.to(legendColors, {
      scaleX: 1,
      transformOrigin: 'center',
      duration: 0.25,
      stagger: 0.1,
      ease: 'power2.out'
    }, 0.2);
    tl.to(legendTexts, {
      opacity: 1,
      x: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power2.out'
    }, '<');

    // Подписи графика
    tl.to(texts, {
      opacity: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power2.out'
    }, 0.2);

    // Bars
    tl.to(bars, {
      scaleX: 1,
      transformOrigin: '0 50%',
      duration: 0.75,
      stagger: 0.01
    }, 0.2);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => tl.play()
    });
  });
}
