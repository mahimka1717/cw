import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const animateList = () => {

  const lists = document.querySelectorAll('.custom-list-component');
  if (!lists.length) return;

  lists.forEach(list => {
    const title = list.querySelector('.custom-list-title');
    const items = list.querySelectorAll('.custom-list li');
    const dividers = list.querySelectorAll('.custom-list-divider');

    // Скрываем всё перед анимацией
    if (title) gsap.set(title, { opacity: 0 });
    if (items.length) gsap.set(items, { opacity: 0, scaleY: 0.7, skewX: 8, transformOrigin: 'top center' });
    if (dividers.length) gsap.set(dividers, { scaleX: 0, transformOrigin: '50% 50%' });

    let tl = gsap.timeline({ paused: true });

    // Заголовок
    if (title) tl.to(title, { opacity: 1, duration: 0.7, ease: 'power2.out' });

    // Элементы списка
    tl.to(items, {
      opacity: 1,
      scaleY: 1,
      skewX: 0,
      duration: 0.75,
      stagger: 0.15,
      ease: 'power2.out'
    }, 0.2);

    // Разделители
    if (dividers.length) {
      tl.to(dividers, {
        scaleX: 1,
        transformOrigin: '50% 50%',
        duration: 0.75,
        stagger: 0.15,
        ease: 'power2.out'
      }, 0.2);
    }

    ScrollTrigger.create({
      trigger: list,
      start: 'top 75%',
      once: true,
      onEnter: () => tl.play()
    });
  });
}