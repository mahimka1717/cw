import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { renderLineChart } from './linechart.js';
import { renderMultibar } from './multibar.js';

export let smoother;

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const xl = 1440;
const md = 740;
let resizeTimer;

const sm = window.matchMedia('(max-width: 575px)');
const lg = window.matchMedia('(max-width: 1299px)');

// smoother
const createScrollSmoother = () => {
    
    createSmoothScrollStructure();
    
    if (smoother) {
        smoother.kill();
    }

    const wd = window.innerWidth;
    const isTablet = wd > md && wd < xl;
    
    // Для планшетов отключаем эффекты у определенных элементов
    if (isTablet) {
        // Находим элементы, которые НЕ должны анимироваться на планшетах
        const elementsToDisable = document.querySelectorAll([`.some-example-not-for-tablet`].join(', '));
        
        // Временно убираем data-speed атрибуты
        elementsToDisable.forEach(el => {
            el.dataset.originalSpeed = el.dataset.speed;
            delete el.dataset.speed;
        });
    }
    
    smoother = ScrollSmoother.create({
        smooth: 2, // Увеличенная плавность (медленнее прокрутка)
        smoothTouch: 1,
        // smoothTouch: isIOS?0.5:false, // Плавность для сенсорных устройств
        effects: true, // window.innerWidth > md ? true : false, // Включаем эффекты только для больших экранов
        
        normalizeScroll: (lg.matches) ? false : {
            allowNestedScroll: true, // позволяет вложенную прокрутку
            type: "pointer,touch,wheel"
        },

        ignoreMobileResize: true,
    });

    ftFixSmoother();
};

function createSmoothScrollStructure() {
  const body = document.body;

  
  if (!body) {
    console.warn('Body element not found');
    return;
  }

  // Проверяем, что структура еще не создана
  if (document.querySelector('#smooth-wrapper')) {
    return; // Структура уже существует
  }

  // Создаем wrapper div
  const smoothWrapper = document.createElement('div');
  smoothWrapper.id = 'smooth-wrapper';

  // Создаем content div
  const smoothContent = document.createElement('div');
  smoothContent.id = 'smooth-content';

  // Перемещаем все дочерние элементы body (кроме smoothWrapper) в smoothContent
  while (body.firstChild) {
    smoothContent.appendChild(body.firstChild);
  }

  // Добавляем content в wrapper
  smoothWrapper.appendChild(smoothContent);

  // Добавляем wrapper в body
  body.appendChild(smoothWrapper);
}

function ftFixSmoother() {

    const sOff = document.querySelector('.pictet-sign-off');
    gsap.killTweensOf(sOff);
    gsap.set(sOff, { clearProps: "all" });
    gsap.set(sOff, { bottom: `unset`, top: 0 });
    const nav = document.querySelector('.nav');

    ScrollTrigger.create({
      trigger: `.m-pc`,
      start: 'top top',
      end: '+=100000 top',
      pin: true,
      pinSpacing: false,
  })
 
  let end = 'top+=77 bottom'
  if (lg.matches) {
    end = 'top bottom'
  }


    ScrollTrigger.create({
      trigger: `.pictet-sign-off`,
      endTrigger: `.footer`,
      start: 'bottom bottom',
      end: end,
      pin: true,
      pinSpacing: false,
    //   markers: true
  })

    ScrollTrigger.create({
      trigger: nav,
      start: 'center center',
      end: '+=100000 top',
      pin: true,
      pinSpacing: false,
  })




}




const lineChartData = {
    title: "Q. How do you measure content success?",
    id: "linechart",
    elements: [
        {val: 38, text: "5 (High)", color: "#00f"},
        {val: 9, text: "4", color: "#00f"},
        {val: 22, text: "3", color: "#00f"},
        {val: 16, text: "2", color: "#00f"},
        {val: 16, text: "1 (Low)", color: "#00f"}
    ]
};

function initLineChart() {
  const el = document.querySelector('.linechart-component');
  if (el) {
    renderLineChart(el, lineChartData);
  }
}

const multibarData = {
    title: "Q. Rate the effectiveness of events as a distribution channel",
    id: "multibar",
    legend: [
        {text: "5 (High)", color: "#0000FF"},
        {text: "4", color: "#6666FF"},
        {text: "3", color: "#A6A6FF"},
        {text: "2", color: "#CCCCFF"},
        {text: "1 (Low)", color: "#F0EDED"},
        {text: "Don’t produce", color: "#FFFFFF"}
    ],
    elements: [
        {text: "Articles", vals:[0, 0, 0, 0, 0, 0]},
        {text: "Video", vals:[0, 0, 0, 0, 0, 0]},
        {text: "White papers", vals:[0, 0, 0, 0, 0, 0]},
        {text: "In-person events", vals:[0, 0, 0, 0, 0, 0]},
        {text: "Virtual events", vals:[0, 0, 0, 0, 0, 0]},
        {text: "Podcasts", vals:[0, 0, 0, 0, 0, 0]},
        {text: "Data visualisation", vals:[0, 0, 0, 0, 0, 0]}
    ]
};

function initMultibar() {
  const el = document.querySelector('.multibar-component');
  if (el) {
    renderMultibar(el, multibarData);
  }
}

const init = () => {
    
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    gsap.config({
        force3D: !isIOS,
    });
    // createScrollSmoother();
    initLineChart();
    initMultibar();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}