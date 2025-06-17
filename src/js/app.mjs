console.log('app');
import Reference from './generators/Reference.js';
import Clients from './generators/Clients.js';
import Service from './components/Service.js';
import About from './components/About.js';

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

// ✅ DOM이 완전히 로드된 후 실행
window.addEventListener('DOMContentLoaded', () => {
  Clients();
  Reference();
  Service();
  About();
});
