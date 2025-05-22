import { fetchData } from '../utils/fetchData.js';

const Clients = async () => {
  const data = await fetchData('clients');
 
  const DOM = {
    clientsList: document.querySelector('.clients--list'),
  }
  const { clientsList } = DOM;
  if (!clientsList) {
    console.error(`Clients component: target element not found`);
    return;
  }

  const template = (item) => {
    const {id, name, logo, link} = item;
    return /* html */ `
      <a href="${link}" class="clients--list--item" data-id="${id}"><img src="/src/images/common/${logo}" alt="${name}"/></a>
    `
  }
  
  // 원본 아이템 추가
  data.forEach((item) => {
    clientsList.insertAdjacentHTML('beforeend', template(item));  
  });
  
  // 무한 스크롤을 위한 아이템 복제 및 추가
  const createInfiniteScroll = () => {
    // 모든 아이템 가져오기
    const items = clientsList.querySelectorAll('.clients--list--item');
    
    // 아이템이 없으면 종료
    if (items.length === 0) return;
    
    // 모든 아이템 복제하여 추가
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clientsList.appendChild(clone);
    });
    
    // 애니메이션 거리 계산 및 CSS 변수 설정
    const totalWidth = Array.from(items).reduce((width, item) => {
      return width + item.offsetWidth;
    }, 0);
    
    // CSS 변수로 애니메이션 거리 설정
    document.documentElement.style.setProperty('--scroll-width', `${-totalWidth}px`);
  };
  
  // 이미지가 로드된 후 무한 스크롤 설정
  window.addEventListener('load', createInfiniteScroll);
}

export default Clients;