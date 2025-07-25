import { renderDonatChart } from './donat.js';

import Handlebars from 'handlebars';
import listTemplateSource from '../hbs/list.hbs?raw';
import donatTemplateSource from '../hbs/donat.hbs?raw';
import multybarTemplateSource from '../hbs/multibar.hbs?raw';

Handlebars.registerPartial('list', listTemplateSource);
Handlebars.registerPartial('donat', donatTemplateSource);

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


const donatData1 = {
    title: "We struggle to keep pace with a fast-evolving content strategy",
    id: "1",
    elements: [
        {val: 66, text: "Agree", color: "#00f"},
        {val: 34, text: "Disagree", color: "#8C8CFF"},
    ]
}

const donatData2 = {
    title: "Q. What’s the biggest challenge within your marketing team’s skill set?",
    id: "2",
    elements: [
        {val: 26, text: "Subject matter experience", color: "#0000FF"},
        {val: 21, text: "Storytelling skill set", color: "#5959FF"},
        {val: 16, text: "Content strategy & ideation", color: "#8C8CFF"},
        {val: 16, text: "Stakeholder management", color: "#B2B2FF"},
        {val: 14, text: "Fluency with new technologies", color: "#E5E5FF"},
        {val: 7, text: "Generational divide", color: "#D6D1CF"},
    ]
}

let k = 0.775

const multybarData2 = {
    title: "Rate your biggest content challenges?",
    id: "2",
    legend: [
        {text: "5 (High)", color: "#0000FF"},
        {text: "4", color: "#6666FF"},
        {text: "3", color: "#A6A6FF"},
        {text: "2", color: "#CCCCFF"},
        {text: "1 (Low)", color: "#F0EDED"},
    ],
    elements: [
        {text: "Resource limitations", vals:[11*k, 20*k, 114*k, 203*k, 360*k]},
        {text: "Content quality", vals:[66*k, 113*k, 227*k, 259*k, 360*k]},
        {text: "Consistency", vals:[ 48*k, 185*k, 270*k, 330*k, 360*k]},
    ]
}






const template = Handlebars.compile('{{> list}}');
const html4 = template(listData4);
document.querySelector('.list[data-id="4"]').innerHTML = html4;


const donatTemplate = Handlebars.compile('{{> donat}}');
const htmlDonat1 = donatTemplate(donatData1);
const htmlDonat2 = donatTemplate(donatData2);

document.querySelector('.donat[data-id="1"]').innerHTML = htmlDonat1;
document.querySelector('.donat[data-id="2"]').innerHTML = htmlDonat2;

const donatEl1 = document.querySelector('.donat-component[data-id="1"]');
const donatEl2 = document.querySelector('.donat-component[data-id="2"]');
if (donatEl1) renderDonatChart(donatEl1, donatData1);
if (donatEl2) renderDonatChart(donatEl2, donatData2);


const multybarTemplate = Handlebars.compile('{{> multibar}}');


const htmlMultybar2 = multybarTemplate(multybarData2);
document.querySelector('.multybar[data-id="2"]').innerHTML = htmlMultybar2;
