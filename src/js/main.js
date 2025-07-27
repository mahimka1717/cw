import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";


export let smoother;

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);


const lg = window.matchMedia('(max-width: 1299px)');








const init = () => {
    
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    gsap.config({
        force3D: !isIOS,
    });

    animateDonats();

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}