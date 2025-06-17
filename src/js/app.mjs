console.log('app');
import Reference from './generators/Reference.js';
import Clients from './generators/Clients.js';
import Service from './components/Service.js';
import About from './components/About.js';
import Product from './components/Product.js';

// 1. Lenis 초기화
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 자연스러운 ease-out
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



// 헤더 show/hide 기능
let lastScrollY = window.scrollY;
const header = document.querySelector('header');
let ticking = false;

function onScroll() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // 스크롤 내릴 때: 헤더 숨김
    header.classList.add('header--hidden');
  } else {
    // 스크롤 올릴 때: 헤더 표시
    header.classList.remove('header--hidden');
  }
  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
});
// ✅ DOM이 완전히 로드된 후 실행
window.addEventListener('DOMContentLoaded', () => {
  Clients();
  Reference();
  Service();
  About();
  Product();
});
