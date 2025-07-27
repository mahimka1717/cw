import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { animateDonats } from './donat.js';
import { animateLineChart } from './linechart.js';
import { animateMultibar } from './multibar.js';
import { animateList } from './list';


import { renderDonatChart } from './donat.js';
import { renderLineChart } from './linechart.js';

import Handlebars from 'handlebars';
import listTemplateSource from '../hbs/list.hbs?raw';
import donatTemplateSource from '../hbs/donat.hbs?raw';
import lineChartTemplateSource from '../hbs/linechart.hbs?raw';
import multybarTemplateSource from '../hbs/multibar.hbs?raw';



Handlebars.registerPartial('list', listTemplateSource);
Handlebars.registerPartial('donat', donatTemplateSource);
Handlebars.registerPartial('linechart', lineChartTemplateSource);
Handlebars.registerPartial('multibar', multybarTemplateSource);

Handlebars.registerHelper('legendColor', function(legend, idx) {
  return legend[idx] && legend[idx].color;
});
Handlebars.registerHelper('percent289', function(val) {
  return (val / 279 * 100).toFixed(2);
});
Handlebars.registerHelper('reverse', function(array) {
  return array.slice().reverse();
});




const listData5 = {
    title: "Top three objectives for content marketing",
    id: "5",
    deviders: true,
    elements: [
        {icon: "icons/icon12.svg", text: "Brand awareness"},
        {icon: "icons/icon13.svg", text: "Lead generation"},
        {icon: "icons/icon14.svg", text: "Sales enablement/support"},
    ]
}

const listData6 = {
    title: "The two priorities for the year ahead:",
    id: "5",
    deviders: true,
    elements: [
        {icon: "icons/icon15.svg", text: "Increase audience engagement"},
        {icon: "icons/icon16.svg", text: "Improve return on investment"},
    ]
}


const donatData3 = {
    title: "Q. Top content priorities for the next 12 months",
    id: "3",
    elements: [
        {val: 28, text: "Improving audience engagement", color: "#0000FF"},
        {val: 24, text: "Improving ROI", color: "#6666FF"},
        {val: 19, text: "Integrating AI", color: "#A6A6FF"},
        {val: 17, text: "Deploying new formats", color: "#CCCCFF"},
        {val: 12, text: "Leveraging events", color: "#F0EDED"},
    ]
}

const donatData4 = {
    title: "Q. What influences your content strategy the most?",
    id: "4",
    elements: [
        {val: 33, text: "Spend vs impact", color: "#0000FF"},
        {val: 30, text: "Audience engagement & feedback", color: "#6666FF"},
        {val: 20, text: "Your sales teams’ needs and influences", color: "#A6A6FF"},
        {val: 17, text: "Internal senior decision-maker preference", color: "#CCCCFF"},
    ]
}

const donatData5 = {
    title: "Q. Which three metrics are most important to you when measuring content performance?",
    id: "5",
    elements: [
        {val: 25, text: "Website metrics", color: "#F55C1C"},
        {val: 21, text: "Social media", color: "#F99D77"},
        {val: 20, text: "Brand perception", color: "#FBC6AF"},
        {val: 18, text: "Lead generation", color: "#FDDED2"},
        {val: 16, text: "Sales conversions", color: "#fff"}

    ]
}

const donatData6 = {
    title: "Q. Which storytelling approach works best for you?",
    id: "6",
    elements: [
        {val: 42, text: "Case study/client voices", color: "#0000FF"},
        {val: 32, text: "Internal content/expert voices", color: "#6666FF"},
        {val: 26, text: "Survey-led thought leadership", color: "#A6A6FF"},
    ]
}

const donatData7 = {
    title: "Business leaders need to be more prominent on social media, communicating at least once a month",
    id: "7",
    elements: [
        {val: 87, text: "Agree", color: "#0000FF"},
        {val: 13, text: "Disagree", color: "#CCCCFF"},
    ]
}


const lineChartData1 = {
    title: "Q. How do you measure content success?",
    id: "1",
    elements: [
        {val: 38, text: "5 (High)", color: "#00f"},
        {val: 9, text: "4", color: "#66F"},
        {val: 22, text: "3", color: "#66F"},
        {val: 16, text: "2", color: "#CFCFFF"},
        {val: 16, text: "1 (Low)", color: "#F0EDED"}
    ]
}

const lineChartData2 = {
    title: "Q. Rate the effectiveness of your website as a distribution channel",
    id: "2",
    elements: [
        {val: 13, text: "5 (High)", color: "#F55C1C"},
        {val: 34, text: "4", color: "#F99D77"},
        {val: 31, text: "3", color: "#FBC6AF"},
        {val: 19, text: "2", color: "#FDDED2"},
        {val: 3, text: "1 (Low)", color: "#fff"}
    ]
}

const lineChartData3 = {
    title: "Q. Rate the effectiveness of social media as a distribution channel",
    id: "3",
    elements: [
        {val: 22, text: "5 (High)", color: "#F55C1C"},
        {val: 38, text: "4", color: "#F99D77"},
        {val: 31, text: "3", color: "#FBC6AF"},
        {val: 6, text: "2", color: "#FDDED2"},
        {val: 3, text: "1 (Low)", color: "#fff"}
    ]
}

const lineChartData4 = {
    title: "Q. Rate the effectiveness of events as a distribution channel",
    id: "4",
    elements: [
        {val: 53, text: "5 (High)", color: "#00f"},
        {val: 31, text: "4", color: "#66F"},
        {val: 9, text: "3", color: "#66F"},
        {val: 3, text: "2", color: "#CFCFFF"},
        {val: 3, text: "1 (Low)", color: "#F0EDED"}
    ]
}

const lineChartData5 = {
    title: "Which region(s) does your remit cover",
    id: "5",
    elements: [
        {val: 44, text: "Global", color: "#F55C1C"},
        {val: 22, text: "Europe", color: "#F55C1C"},
        {val: 15, text: "APAC", color: "#F55C1C"},
        {val: 7, text: "US", color: "#F55C1C"},
        {val: 7, text: "Middle East", color: "#F55C1C"},
        {val: 5, text: "Other", color: "#F55C1C"}
    ]
}

const lineChartData6 = {
    title: "Which sector are you operating in?",
    id: "6",
    elements: [
        {val: 60, text: "Banking/Finance/Insurance", color: "#F55C1C"},
        {val: 20, text: "Tech/Software/Platform", color: "#F55C1C"},
        {val: 6, text: "Transportation", color: "#F55C1C"},
        {val: 6, text: "Energy", color: "#F55C1C"},
        {val: 3, text: "Manufacturing", color: "#F55C1C"},
        {val: 6, text: "Other Entries", color: "#F55C1C"}
    ]
}








const multybarData1 = {
    title: "Q. Rate the effectiveness of events as a distribution channel",
    id: "1",
    legend: [
        {text: "5 (High)", color: "#0000FF"},
        {text: "4", color: "#6666FF"},
        {text: "3", color: "#A6A6FF"},
        {text: "2", color: "#CCCCFF"},
        {text: "1 (Low)", color: "#FFFFFF"},
        {text: "Don’t produce", color: "#F0EDED"}
    ],
    elements: [
        {text: "Articles", vals:[0, 19, 36, 130, 228, 279]},
        {text: "Video", vals:[0, 0, 30, 92, 188, 279]},
        {text: "White papers", vals:[0, 48, 107, 187, 257, 279]},
        {text: "In-person events", vals:[0, 17, 26, 34, 132, 279]},
        {text: "Virtual events", vals:[54, 78, 132, 217, 269, 279]},
        {text: "Podcasts", vals:[0, 94, 149, 228, 268, 279]},
        {text: "Data visualisation", vals:[78, 88, 122, 160, 238, 279]}
    ]
}






const template = Handlebars.compile('{{> list}}');
const html5 = template(listData5);
const html6 = template(listData6);

document.querySelector('.list[data-id="5"]').innerHTML = html5;
document.querySelector('.list[data-id="6"]').innerHTML = html6;




const donatTemplate = Handlebars.compile('{{> donat}}');
const htmlDonat3 = donatTemplate(donatData3);
const htmlDonat4 = donatTemplate(donatData4);
const htmlDonat5 = donatTemplate(donatData5);
const htmlDonat6 = donatTemplate(donatData6);
const htmlDonat7 = donatTemplate(donatData7);

document.querySelector('.donat[data-id="3"]').innerHTML = htmlDonat3;
document.querySelector('.donat[data-id="4"]').innerHTML = htmlDonat4;
document.querySelector('.donat[data-id="5"]').innerHTML = htmlDonat5;
document.querySelector('.donat[data-id="6"]').innerHTML = htmlDonat6;
document.querySelector('.donat[data-id="7"]').innerHTML = htmlDonat7;

const donatEl3 = document.querySelector('.donat-component[data-id="3"]');
const donatEl4 = document.querySelector('.donat-component[data-id="4"]');
const donatEl5 = document.querySelector('.donat-component[data-id="5"]');
const donatEl6 = document.querySelector('.donat-component[data-id="6"]');
const donatEl7 = document.querySelector('.donat-component[data-id="7"]');
if (donatEl3) renderDonatChart(donatEl3, donatData3);
if (donatEl4) renderDonatChart(donatEl4, donatData4);
if (donatEl5) renderDonatChart(donatEl5, donatData5);
if (donatEl6) renderDonatChart(donatEl6, donatData6);
if (donatEl7) renderDonatChart(donatEl7, donatData7);



const linechartTemplate = Handlebars.compile('{{> linechart}}');
const htmlLinechart1 = linechartTemplate(lineChartData1);
const htmlLinechart2 = linechartTemplate(lineChartData2);
const htmlLinechart3 = linechartTemplate(lineChartData3);
const htmlLinechart4 = linechartTemplate(lineChartData4);
const htmlLinechart5 = linechartTemplate(lineChartData5);
const htmlLinechart6 = linechartTemplate(lineChartData6);


document.querySelector('.linechart[data-id="1"]').innerHTML = htmlLinechart1;
document.querySelector('.linechart[data-id="2"]').innerHTML = htmlLinechart2;
document.querySelector('.linechart[data-id="3"]').innerHTML = htmlLinechart3;
document.querySelector('.linechart[data-id="4"]').innerHTML = htmlLinechart4;
document.querySelector('.linechart[data-id="5"]').innerHTML = htmlLinechart5;
document.querySelector('.linechart[data-id="6"]').innerHTML = htmlLinechart6;





const multybarTemplate = Handlebars.compile('{{> multibar}}');
const htmlMultybar1 = multybarTemplate(multybarData1);
document.querySelector('.multybar[data-id="1"]').innerHTML = htmlMultybar1;




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






export function animateValues() {
  const values = document.querySelectorAll('.value');
  values.forEach(valBlock => {
    const numDiv = valBlock.children[0];
    const textDiv = valBlock.children[1];
    if (!numDiv || !textDiv) return;
    gsap.set(textDiv, { opacity: 0, y: 10 });
    gsap.set(numDiv, { opacity: 0 });
    let tl = gsap.timeline({ paused: true });
    const target = parseInt(numDiv.textContent);
    tl.to(numDiv, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
    tl.fromTo(numDiv, {
      innerText: 0
    }, {
      innerText: target,
      duration: 1,
      roundProps: 'innerText',
      onUpdate: function() {
        numDiv.textContent = Math.round(this.targets()[0].innerText);
      }
    }, '<');
    tl.to(textDiv, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power2.out'
    }, '-=0.75');
    ScrollTrigger.create({
      trigger: valBlock,
      start: 'top 75%',
      once: true,
      onEnter: () => tl.play()
    });
  });
}


animateDonats();
animateLineChart();
animateMultibar();

animateValues();
animateList();

animateImage(["2", "3", "4"])