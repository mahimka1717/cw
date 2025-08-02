import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

import Handlebars from 'handlebars';
import listTemplateSource from '../hbs/list.hbs?raw';

import { animateList } from './list';


Handlebars.registerPartial('list', listTemplateSource);



const listData1 = {
  title: "Simulate EEAT signals with text and depth:",
  id: "1",
  deviders: true,
  elements: [
    {icon: "/icons/icon1-1.svg", text: "Experience"},
    {icon: "/icons/icon1-2.svg", text: "Expertise"},
    {icon: "/icons/icon1-3.svg", text: "Authority"},
    {icon: "/icons/icon1-4.svg", text: "Trust"}
    ]
};

const listData2 = {
  title: "This means:",
  id: "2",
  deviders: true,
  elements: [
    {icon: "/icons/icon2.svg", text: "Mentions on trustworthy public domains"},
    {icon: "/icons/icon3.svg", text: "Long-form explainers authored by subject matter experts"},
    {icon: "/icons/icon4.svg", text: "Case studies validated by third parties"},
    {icon: "/icons/icon5.svg", text: "Research-backed thought leadership, with citations and verifiable data"},
    {icon: "/icons/icon6.svg", text: "Written transcripts of video and audio content"},
    {icon: "/icons/icon7.svg", text: "Using a conversational tone"},
    ]
};

const listData3 = {
    title: "",
    id: "3",
    deviders: true,
    elements: [
        {icon: "/icons/icon8.svg", text: "<b>What do the machines currently say about your brand?</b>"},
        {icon: "/icons/icon8.svg", text: "<b>How do they compare you to your competitors?</b>"},
        {icon: "/icons/icon8.svg", text: "<b>What topics are they connecting you to?</b>"},
        {icon: "/icons/icon8.svg", text: "<b>Are you providing the content they need to recommend you?</b>"},
    ]
}

const listData4 = {
    title: "To stay relevant and grow one’s value, three areas stand out for internal marketers and external agency teams:",
    id: "4",
    deviders: false,
    elements: [
        {icon: "/icons/icon9.svg", text: "<b>Content strategy:</b> Not just delivery, but discernmentContent creation and distribution"},
        {icon: "/icons/icon10.svg", text: "<b>Business fluency:</b> Context is essential to credibility"},
        {icon: "/icons/icon11.svg", text: "<b>Storytelling:</b> As a tool for clarity and influence"},
    ]
}

const listData5 = {
    title: "Top three objectives for content marketing",
    id: "5",
    deviders: true,
    elements: [
        {icon: "icons/icon12.svg", text: ""},
        {icon: "icons/icon13.svg", text: ""},
        {icon: "icons/icon14.svg", text: ""},
    ]
}

const template = Handlebars.compile('{{> list}}');
const html1 = template(listData1);
const html2 = template(listData2);
const html3 = template(listData3);

document.querySelector('.list[data-id="1"]').innerHTML = html1;
document.querySelector('.list[data-id="2"]').innerHTML = html2;
document.querySelector('.list[data-id="3"]').innerHTML = html3;




function animateImage(ids = ["2", "3", "4"]) {
  ids.forEach(id => {
    document.querySelectorAll(`.image[data-id="${id}"]`).forEach(image => {
      gsap.set(image, { backgroundSize: '100%' });
      gsap.to(image, {
        backgroundSize: '120%',
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  });
}


function animateBarchart1() {
  document.querySelectorAll('.barchart_1').forEach(chart => {
    const title = chart.querySelector('span');
    const svg = chart.querySelector('svg');
    if (!svg) return;

    // Все text внутри SVG
    const texts = svg.querySelectorAll('text');
    // Все tspan внутри text
    const tspans = Array.from(texts).flatMap(t => Array.from(t.querySelectorAll('tspan')));
    // Все path внутри SVG
    const paths = svg.querySelectorAll('path');

    // Скрываем всё перед анимацией
    if (title) gsap.set(title, { opacity: 0 });
    if (tspans.length) gsap.set(tspans, { opacity: 0 });
    paths.forEach((path, i) => {
      if (i < 6) {
        // Первые 6: opacity: 0
        gsap.set(path, { opacity: 0 });
      } else {
        // Остальные: scaleX: 0, transformOrigin: '100% 50%'
        gsap.set(path, { scaleX: 0, transformOrigin: '100% 50%' });
      }
    });

    const tl = gsap.timeline({ paused: true });

    // Заголовок
    if (title) tl.to(title, { opacity: 1, duration: 0.7, ease: 'power2.out' });

    // tspan (тексты)
    if (tspans.length) tl.to(tspans, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, 0.2);

    // path: четные и нечетные
    paths.forEach((path, i) => {
      if (i < 6) {
        // Первые 6: opacity
        tl.to(path, {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out'
        }, 0.2 + i * 0.1);
      } else {
        // Остальные: scaleX
        tl.to(path, {
          scaleX: 1,
          transformOrigin: '100% 50%',
          duration: 0.7,
          ease: 'power2.out'
        }, 0.2 + i * 0.1);
      }
    });

    ScrollTrigger.create({
      trigger: chart,
      start: 'top 75%',
      once: true,
      onEnter: () => tl.play()
    });
  });
}






function animateBarchart2() {
  const chart = document.querySelector('.barchart_2');
  if (!chart) return;

  const title = chart.querySelector('span');
  const svg = chart.querySelector('svg');
  if (!svg) return;

  const line = svg.querySelector('line');
  const bars = svg.querySelectorAll('path');
  const texts = svg.querySelectorAll('text');

  // Первые 5 text — подписи оси, вторые 5 — значения
  const axisTexts = Array.from(texts).slice(0, 5);
  const valueTexts = Array.from(texts).slice(5, 10);

  // Скрываем всё перед анимацией
  if (title) gsap.set(title, { opacity: 0 });
  if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'center' });
  if (bars.length) gsap.set(bars, { scaleY: 0, transformOrigin: '50% 100%' });
  if (axisTexts.length) gsap.set(axisTexts, { opacity: 0, y: -5 });
  if (valueTexts.length) gsap.set(valueTexts, { opacity: 0, y: 5 });

  const tl = gsap.timeline({ paused: true });

  // Заголовок
  if (title) tl.to(title, { opacity: 1, duration: 0.7, ease: 'power2.out' });

  // Линия
  if (line) tl.to(line, { scaleX: 1, transformOrigin: 'center', duration: 0.7, ease: 'power2.out' }, 0.2);

  // Бары
  if (bars.length) tl.to(bars, {
    scaleY: 1,
    transformOrigin: '50% 100%',
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out'
  }, 0.2);

  // Тексты оси
  if (axisTexts.length) tl.to(axisTexts, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
  }, 0.2);

  // Тексты значений
  if (valueTexts.length) tl.to(valueTexts, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
  }, 0.7);

  ScrollTrigger.create({
    trigger: chart,
    start: 'top 75%',
    once: true,
    onEnter: () => tl.play()
  });
}



function initQuotes() {
  const quote = document.getElementById('cw-quote');
  if (!quote) return;

  // Split text into lines using GSAP SplitText with native masks
  let split = new SplitText(quote, { type: 'lines', linesClass: 'cw-quote-line', mask: 'lines' });
  const lines = split.lines && split.lines.length > 0 ? split.lines : [quote];



  // Анимируем строки SplitText напрямую
  gsap.set(lines, { y: '100%', opacity: 0 });

  const tl = gsap.timeline({ paused: true });
  // Animate borders with width effect

  // Animate lines
  tl.to(lines, {
    y: '0%',
    opacity: 1,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out'
  }, 0.2);

  ScrollTrigger.create({
    trigger: quote,
    start: 'top 75%',
    once: true,
    onEnter: () => tl.play()
  });
}



function animateFormula() {
  const svg = document.querySelector('.svg-formula');
  if (!svg) return;

  const texts = svg.querySelectorAll('text');
  if (texts.length < 8) return;

  // Скрываем все тексты
  texts.forEach(t => gsap.set(t, { opacity: 0, scale: 1, x: 0 }));

  const tl = gsap.timeline({ paused: true });

  // 1. Первый текст (B2M) opacity
  tl.to(texts[0], { opacity: 1, duration: 0.75, ease: 'power2.out' }, 0);
  // 2. Второй текст (Business to Machines) opacity + x -15
  tl.to(texts[1], { opacity: 1, x: -15, duration: 0.75, ease: 'power2.out' }, 0);
  // 3. Третий текст (+) opacity + scale 1.1 через 0.25, transformOrigin center
  tl.to(texts[2], { opacity: 1, scale: 1.1, transformOrigin: '50% 50%', duration: 0.75, ease: 'power2.out' }, 0.25);
  // 4. Четвертый текст (H) opacity
  tl.to(texts[3], { opacity: 1, duration: 0.75, ease: 'power2.out' }, 0.5);
  // 5. Пятый текст (Humans) opacity + x -15 одновременно с 4 через 0.5
  tl.to(texts[4], { opacity: 1, x: -15, duration: 0.75, ease: 'power2.out' }, 0.5);
  // 6. Шестой текст (=) opacity + scale 1.1 через 0.75, transformOrigin center
  tl.to(texts[5], { opacity: 1, scale: 1.1, transformOrigin: '50% 50%', duration: 0.75, ease: 'power2.out' }, 0.75);
  // 7. Седьмой текст (ROI) opacity
  tl.to(texts[6], { opacity: 1, duration: 0.75, ease: 'power2.out' }, 1);
  // 8. Восьмой текст (Sales + Impact) opacity + x -15 одновременно с 7 через 1
  tl.to(texts[7], { opacity: 1, x: -15, duration: 0.75, ease: 'power2.out' }, 1);

  ScrollTrigger.create({
    trigger: svg,
    start: 'top 75%',
    once: true,
    onEnter: () => tl.play()
  });
}


animateList();
animateImage(["1"]);
// animateBarchart1();
animateBarchart2();
// initQuotes();
// animateFormula();