import { renderDonatChart } from './donat.js';

import Handlebars from 'handlebars';
import listTemplateSource from '../hbs/list.hbs?raw';
import donatTemplateSource from '../hbs/donat.hbs?raw';

Handlebars.registerPartial('list', listTemplateSource);
Handlebars.registerPartial('donat', donatTemplateSource);



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
        {val: 34, text: "Disagree", color: "#f00"},
    ]
}

const donatData2 = {
    title: "Q. What’s the biggest challenge within your marketing team’s skill set?",
    id: "2",
    elements: [
        {val: 26, text: "Subject matter experience", color: "#00f"},
        {val: 21, text: "Storytelling skill set", color: "#f00"},
        {val: 16, text: "Content strategy & ideation", color: "#0f0"},
        {val: 16, text: "Stakeholder management", color: "#ff0"},
        {val: 14, text: "Fluency with new technologies", color: "#0ff"},
        {val: 7, text: "Generational divide", color: "#f0f"},
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

