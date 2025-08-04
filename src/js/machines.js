import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

import listTemplateSource from '../hbs/list.hbs?raw';
import { animateList } from './list';
import Handlebars from 'handlebars';
Handlebars.registerPartial('list', listTemplateSource);






// Обычная floatRandomly для одного элемента
function floatRandomly(selector) {
  const el = document.querySelector(selector);
  const n = 5; // Максимальное смещение в пикселях
  if (!el) return;

  const animate = () => {
    gsap.to(el, {
      x: gsap.utils.random(-n, n),
      y: gsap.utils.random(-n, n),
      duration: gsap.utils.random(1.5, 3),
      ease: "sine.inOut",
      onComplete: animate
    });
  };

  animate();
}




const animateImage = (ids = ["2", "3", "4"]) => {
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

const animateBarchart = () => {
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

const initQuotes = () => {
  const quote = document.querySelector('#cw-quote');
  const quoteText = quote.querySelector('.cw-quote-text');
  const orangelines = quote.querySelectorAll('.cw-quote-line')
  const links = document.querySelector('.links')

  gsap.set(orangelines, {scaleX: 0})
  gsap.set(links, {opacity: 0})

SplitText.create(quoteText, {
  type: "lines",
  mask: 'lines',
  autoSplit: true,
  onSplit: (self) => {
  
    const lines = self.lines
    gsap.set(lines, { y: '100%', opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(orangelines, {
      scaleX: 1,
      duration: 1,
      stagger: 0,
      ease: 'power2.out'
    }, 0);
    tl.to(lines, {
      y: '0%',
      opacity: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power2.out'
    }, 0.2);
    tl.to(links, {
      opacity: 1,
      duration: 0.75,
      stagger: 0,
      ease: 'power2.out'
    }, 0.5);


    ScrollTrigger.create({
      trigger: quote,
      start: 'top 75%',
      once: true,
      onEnter: () => tl.play()
    });


  }
});











}


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

const template = Handlebars.compile('{{> list}}');
const html1 = template(listData1);
const html2 = template(listData2);
const html3 = template(listData3);

document.querySelector('.list[data-id="1"]').innerHTML = html1;
document.querySelector('.list[data-id="2"]').innerHTML = html2;
document.querySelector('.list[data-id="3"]').innerHTML = html3;

animateList();
animateImage(["1"]);
animateBarchart();
initQuotes();

  floatRandomly('.image[data-id="5-1"]');
  floatRandomly('.image[data-id="5-2"]');
  floatRandomly('.image[data-id="5-3"]');