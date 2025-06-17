import { fetchData } from '../utils/fetchData.js';

const Clients = async () => {
  let data = [];

  try {
    const fetched = await fetchData('clients');
    if (!Array.isArray(fetched)) throw new Error('Invalid client data');
    data = fetched;
  } catch (error) {
    console.error('Clients component: failed to fetch client data →', error);
    return;
  }

  const clientsList = document.querySelector('.clients--list');
  if (!clientsList) {
    console.error('Clients component: .clients--list not found in DOM');
    return;
  }

  const template = (item) => {
    const { id, name, logo, link } = item;
    if (!id || !name || !logo || !link) return '';
    return /* html */ `
      <a href="${link}" class="clients--list--item" data-id="${id}">
        <img src="/src/images/common/${logo}" alt="${name}" />
      </a>
    `;
  };

  // 안전하게 DOM에 삽입
  data.forEach((item) => {
    const html = template(item);
    if (html) clientsList.insertAdjacentHTML('beforeend', html);
  });

  const createInfiniteScroll = () => {
    const items = clientsList.querySelectorAll('.clients--list--item');

    if (items.length === 0) {
      console.warn('Clients component: no items to clone for infinite scroll');
      return;
    }

    // 중복 클론 방지
    const alreadyCloned = clientsList.dataset.cloned === 'true';
    if (alreadyCloned) return;

    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clientsList.appendChild(clone);
    });

    clientsList.dataset.cloned = 'true'; // 마킹

    // 모든 이미지의 로딩 완료 후 너비 측정
    const images = clientsList.querySelectorAll('img');
    const loadPromises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = img.onerror = resolve;
      });
    });

    Promise.all(loadPromises).then(() => {
      const totalWidth = Array.from(clientsList.children).reduce(
        (width, item) => width + item.offsetWidth,
        0
      );
      document.documentElement.style.setProperty('--scroll-width', `${-totalWidth}px`);
    });
  };

  // 이미지 또는 DOM 렌더 완료 후 실행
  window.addEventListener('load', createInfiniteScroll);
};

export default Clients;
