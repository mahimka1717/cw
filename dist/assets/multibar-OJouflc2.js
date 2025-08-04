import{g as c,S}from"./list-B1dwnban.js";/*!
 * DrawSVGPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var _,$,q,I,B,D,T,W,j=function(){return typeof window<"u"},F=function(){return _||j()&&(_=window.gsap)&&_.registerPlugin&&_},Z=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,P={rect:["width","height"],circle:["r","r"],ellipse:["rx","ry"],line:["x2","y2"]},x=function(t){return Math.round(t*1e4)/1e4},y=function(t){return parseFloat(t)||0},N=function(t,e){var n=y(t);return~t.indexOf("%")?n/100*e:n},v=function(t,e){return y(t.getAttribute(e))},k=Math.sqrt,L=function(t,e,n,i,r,s){return k(Math.pow((y(n)-y(t))*r,2)+Math.pow((y(i)-y(e))*s,2))},G=function(t){return console.warn(t)},H=function(t){return t.getAttribute("vector-effect")==="non-scaling-stroke"},z=1,J=function(t,e,n){var i=t.indexOf(" "),r,s;return i<0?(r=n!==void 0?n+"":t,s=t):(r=t.substr(0,i),s=t.substr(i+1)),r=N(r,e),s=N(s,e),r>s?[s,r]:[r,s]},M=function(t){if(t=$(t)[0],!t)return 0;var e=t.tagName.toLowerCase(),n=t.style,i=1,r=1,s,a,o,d,u,h,m;H(t)&&(r=t.getScreenCTM(),i=k(r.a*r.a+r.b*r.b),r=k(r.d*r.d+r.c*r.c));try{a=t.getBBox()}catch{G("Some browsers won't measure invisible elements (like display:none or masks inside defs).")}var b=a||{x:0,y:0,width:0,height:0},w=b.x,g=b.y,f=b.width,p=b.height;if((!a||!f&&!p)&&P[e]&&(f=v(t,P[e][0]),p=v(t,P[e][1]),e!=="rect"&&e!=="line"&&(f*=2,p*=2),e==="line"&&(w=v(t,"x1"),g=v(t,"y1"),f=Math.abs(f-w),p=Math.abs(p-g))),e==="path")d=n.strokeDasharray,n.strokeDasharray="none",s=t.getTotalLength()||0,x(i)!==x(r)&&!D&&(D=1)&&G("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."),s*=(i+r)/2,n.strokeDasharray=d;else if(e==="rect")s=f*2*i+p*2*r;else if(e==="line")s=L(w,g,w+f,g+p,i,r);else if(e==="polyline"||e==="polygon")for(o=t.getAttribute("points").match(Z)||[],e==="polygon"&&o.push(o[0],o[1]),s=0,u=2;u<o.length;u+=2)s+=L(o[u-2],o[u-1],o[u],o[u+1],i,r)||0;else(e==="circle"||e==="ellipse")&&(h=f/2*i,m=p/2*r,s=Math.PI*(3*(h+m)-k((3*h+m)*(h+3*m))));return s||0},V=function(t,e){if(t=$(t)[0],!t)return[0,0];e||(e=M(t)+1);var n=q.getComputedStyle(t),i=n.strokeDasharray||"",r=y(n.strokeDashoffset),s=i.indexOf(",");return s<0&&(s=i.indexOf(" ")),i=s<0?e:y(i.substr(0,s)),i>e&&(i=e),[-r||0,i-r||0]},X=function(){j()&&(q=window,B=_=F(),$=_.utils.toArray,T=_.core.getStyleSaver,W=_.core.reverting||function(){},I=((q.navigator||{}).userAgent||"").indexOf("Edge")!==-1)},C={version:"3.13.0",name:"drawSVG",register:function(t){_=t,X()},init:function(t,e,n,i,r){if(!t.getBBox)return!1;B||X();var s=M(t),a,o,d;return this.styles=T&&T(t,"strokeDashoffset,strokeDasharray,strokeMiterlimit"),this.tween=n,this._style=t.style,this._target=t,e+""=="true"?e="0 100%":e?(e+"").indexOf(" ")===-1&&(e="0 "+e):e="0 0",a=V(t,s),o=J(e,s,a[0]),this._length=x(s),this._dash=x(a[1]-a[0]),this._offset=x(-a[0]),this._dashPT=this.add(this,"_dash",this._dash,x(o[1]-o[0]),0,0,0,0,0,1),this._offsetPT=this.add(this,"_offset",this._offset,x(-o[0]),0,0,0,0,0,1),I&&(d=q.getComputedStyle(t),d.strokeLinecap!==d.strokeLinejoin&&(o=y(d.strokeMiterlimit),this.add(t.style,"strokeMiterlimit",o,o+.01))),this._live=H(t)||~(e+"").indexOf("live"),this._nowrap=~(e+"").indexOf("nowrap"),this._props.push("drawSVG"),z},render:function(t,e){if(e.tween._time||!W()){var n=e._pt,i=e._style,r,s,a,o;if(n){for(e._live&&(r=M(e._target),r!==e._length&&(s=r/e._length,e._length=r,e._offsetPT&&(e._offsetPT.s*=s,e._offsetPT.c*=s),e._dashPT?(e._dashPT.s*=s,e._dashPT.c*=s):e._dash*=s));n;)n.r(t,n.d),n=n._next;a=e._dash||t&&t!==1&&1e-4||0,r=e._length-a+.1,o=e._offset,a&&o&&a+Math.abs(o%e._length)>e._length-.05&&(o+=o<0?.005:-.005)&&(r+=.005),i.strokeDashoffset=a?o:o+.001,i.strokeDasharray=r<.1?"none":a?a+"px,"+(e._nowrap?999999:r)+"px":"0px, 999999px"}}else e.styles.revert()},getLength:M,getPosition:V};F()&&_.registerPlugin(C);c.registerPlugin(S,C);function Q(l,t){const e=l.querySelector(".donat-chart g");if(!e){console.error("SVG <g> element not found in donat-chart");return}e.innerHTML="";const n=97,i=44/2,r=n-i;let s=-Math.PI/2;const a=t.elements.reduce((m,b)=>m+b.val,0);if(!t.elements||!t.elements.length){console.warn("No elements for donat chart");return}const o=`donatMask-${Math.random().toString(36).substr(2,9)}`,d=document.createElementNS("http://www.w3.org/2000/svg","mask");d.setAttribute("id",o);const u=document.createElementNS("http://www.w3.org/2000/svg","circle");u.setAttribute("cx",n),u.setAttribute("cy",n),u.setAttribute("r",n-i/2),u.setAttribute("fill","none"),u.setAttribute("stroke","white"),u.setAttribute("stroke-width",i),u.setAttribute("class","donat-anim-stroke"),u.setAttribute("style","pointer-events:none"),u.setAttribute("transform",`rotate(-90 ${n} ${n})`),d.appendChild(u),e.appendChild(d),t.elements.forEach((m,b)=>{const w=m.val/a*2*Math.PI,g=s+w,f=n+n*Math.cos(s),p=n+n*Math.sin(s),E=n+n*Math.cos(g),U=n+n*Math.sin(g),O=w>Math.PI?1:0,Y=[`M ${n+r*Math.cos(s)} ${n+r*Math.sin(s)}`,`L ${f} ${p}`,`A ${n} ${n} 0 ${O} 1 ${E} ${U}`,`L ${n+r*Math.cos(g)} ${n+r*Math.sin(g)}`,`A ${r} ${r} 0 ${O} 0 ${n+r*Math.cos(s)} ${n+r*Math.sin(s)}`,"Z"].join(" "),A=document.createElementNS("http://www.w3.org/2000/svg","path");A.setAttribute("d",Y),A.setAttribute("fill",m.color),A.setAttribute("stroke","#fff"),A.setAttribute("stroke-width","0.5"),A.setAttribute("mask",`url(#${o})`),e.appendChild(A),s=g});const h=document.createElementNS("http://www.w3.org/2000/svg","circle");h.setAttribute("cx",n),h.setAttribute("cy",n),h.setAttribute("r",r),h.setAttribute("fill","transparent"),e.appendChild(h)}function R(){const l=document.querySelectorAll(".donat-component");if(!l||!l.length){console.warn("No donat components found");return}l.forEach(t=>{const e=t.querySelector(".donat-title-d"),n=t.querySelectorAll(".donat-legend__color"),i=t.querySelectorAll(".donat-legend__text"),r=t.querySelector(".donat-chart g"),s=r?r.querySelector(".donat-anim-stroke"):null;e&&c.set(e,{opacity:0}),n.length&&c.set(n,{scaleX:0,transformOrigin:"center"}),i.length&&c.set(i,{opacity:0,x:15}),s&&c.set(s,{drawSVG:"0% 0%"});let a=c.timeline({paused:!0});e&&a.to(e,{opacity:1,duration:1,ease:"power2.out"}),n.length&&a.to(n,{scaleX:1,transformOrigin:"center",duration:.25,stagger:.1,ease:"power2.out"},.2),i.length&&a.to(i,{opacity:1,x:0,duration:.75,stagger:.1,ease:"power2.out"},.2),s&&a.to(s,{drawSVG:"0% 100%",duration:1,ease:"power2.out"},.2),S.create({trigger:t,start:"top 75%",once:!0,onEnter:()=>a.play()})})}c.registerPlugin(S,C);function tt(){const l=document.querySelectorAll(".linechart-component");l.length&&l.forEach(t=>{const e=t.querySelector(".linechart-title");t.querySelectorAll(".linechart-list__item");const n=t.querySelectorAll(".linechart-list__text"),i=t.querySelectorAll(".linechart-list__bar"),r=t.querySelectorAll(".linechart-list__val"),s=t.querySelectorAll(".linechart-line");e&&c.set(e,{opacity:0}),n.length&&c.set(n,{opacity:0}),i.length&&c.set(i,{scaleX:0,transformOrigin:"0 50%"}),r.length&&c.set(r,{opacity:0}),s.length&&c.set(s,{opacity:0});let a=c.timeline({paused:!0});e&&a.to(e,{opacity:1,duration:1,ease:"power2.out"}),a.to(n,{opacity:1,duration:.5,stagger:.1,ease:"power2.out"},.2),a.to(s,{opacity:1,duration:.5,stagger:.1,ease:"power2.out"},.2),a.to(i,{scaleX:1,transformOrigin:"0 50%",duration:.7,stagger:.1,ease:"power2.out"},.2),r.forEach((o,d)=>{const u=parseInt(o.textContent);a.to(o,{opacity:1,duration:.5,ease:"power2.out",onStart:()=>{c.fromTo(o,{innerText:0},{innerText:u,duration:.7,roundProps:"innerText",onUpdate:function(){o.textContent=Math.round(this.targets()[0].innerText)+"%"}})}},.2+d*.2)}),S.create({trigger:t,start:"top 75%",once:!0,onEnter:()=>a.play()})})}c.registerPlugin(S);function et(){const l=document.querySelectorAll(".multibar-component");l.length&&l.forEach(t=>{const e=t.querySelector(".multibar-title"),n=t.querySelectorAll(".multibar-legend__color"),i=t.querySelectorAll(".multibar-legend__text");t.querySelectorAll(".multibar-list__item");const r=t.querySelectorAll(".multibar-list__text"),s=t.querySelectorAll(".multibar-list__barwrap");let a=[];s.forEach(d=>{a=a.concat(Array.from(d.querySelectorAll(".multibar-list__bar")))}),e&&c.set(e,{opacity:0}),n.length&&c.set(n,{scaleX:0,transformOrigin:"center"}),i.length&&c.set(i,{opacity:0,x:15}),r.length&&c.set(r,{opacity:0}),a.length&&c.set(a,{scaleX:0,transformOrigin:"0 50%"});let o=c.timeline({paused:!0});e&&o.to(e,{opacity:1,duration:1,ease:"power2.out"}),o.to(n,{scaleX:1,transformOrigin:"center",duration:.25,stagger:.1,ease:"power2.out"},.2),o.to(i,{opacity:1,x:0,duration:.75,stagger:.1,ease:"power2.out"},"<"),o.to(r,{opacity:1,duration:.75,stagger:.1,ease:"power2.out"},.2),o.to(a,{scaleX:1,transformOrigin:"0 50%",duration:.75,stagger:.01},.2),S.create({trigger:t,start:"top 75%",once:!0,onEnter:()=>o.play()})})}const nt=`<div class="donat-component" data-id="{{id}}">
  
  {{#if title}}
    <h3 class="donat-title">{{title}}</h3>
  {{/if}}

  <div class="donat-box">
  
    <div class="donat-legend">
      {{#each elements}}
        <div class="donat-legend__item">
          <span class="donat-legend__color" style="background: {{color}}"></span>
          <span class="donat-legend__text">{{text}} (<b>{{val}}%</b>)</span>
        </div>
      {{/each}}
    </div>
   
    <svg class="donat-chart" width="194" height="194" viewBox="0 0 194 194">
      <g></g>
    </svg>

  </div>

</div>
`,rt=`<div class="multibar-component" data-id="{{id}}">
  {{#if title}}
    <h3 class="multibar-title">{{title}}</h3>
  {{/if}}

<div class="multibar-box">

  <div class="multibar-legend">
    {{#if (eq id "1")}}
      {{#each legend}}
        <div class="multibar-legend__item">
          <span class="multibar-legend__color" style="background: {{color}}"></span>
          <span class="multibar-legend__text">{{text}}</span>
        </div>
      {{/each}}
    {{else}}
      {{#each (reverse legend)}}
        <div class="multibar-legend__item">
          <span class="multibar-legend__color" style="background: {{color}}"></span>
          <span class="multibar-legend__text">{{text}}</span>
        </div>
      {{/each}}
    {{/if}}
  </div>
  <div class="multibar-list">
    {{#each elements}}
      <div class="multibar-list__item">
        <span class="multibar-list__text">{{text}}</span>
        <div class="multibar-list__barwrap">
          {{#each (reverse vals)}}
            <span class="multibar-list__bar" style="width: {{percent289 this}}%; background: {{legendColor ../../legend @index}}; border-radius: 50%"></span>
          {{/each}}
        </div>
      </div>
    {{/each}}
  </div>

</div>


</div>
</div>
`;export{R as a,et as b,tt as c,nt as d,rt as m,Q as r};
