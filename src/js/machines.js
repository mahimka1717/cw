import Handlebars from 'handlebars';
import listTemplateSource from '../hbs/list.hbs?raw';

Handlebars.registerPartial('list', listTemplateSource);



const listData1 = {
  title: "Simulate EEAT signals with text and depth:",
  id: "1",
  deviders: true,
  elements: [
    {icon: "/icons/icon1.svg", text: "Experience"},
    {icon: "/icons/icon1.svg", text: "Expertise"},
    {icon: "/icons/icon1.svg", text: "Authority"},
    {icon: "/icons/icon1.svg", text: "Trust"}
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
    title: "So ask yourself",
    id: "3",
    deviders: true,
    elements: [
        {icon: "/icons/icon8.svg", text: "What do the machines currently say about your brand?"},
        {icon: "/icons/icon8.svg", text: "How do they compare you to your competitors?"},
        {icon: "/icons/icon8.svg", text: "What topics are they connecting you to?"},
        {icon: "/icons/icon8.svg", text: "Are you providing the content they need to recommend you?"},
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