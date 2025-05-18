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

  //  "id": 1,
  // "name": "한국안전기술원",
  // "logo": "STC_CI_Logo.svg",
  // "link": "https://www.kosaf.go.kr/portal/main.do"
  const template = (item) => {
    const {id, name, logo, link} = item;
    return /* html */ `
      <a herf="${link}" class="clients--item" data-id="${id}"><img src="/src/images/common/${logo}" alt="${name}"/></a>
    `
    }
  
  data.forEach((item) => {
    clientsList.insertAdjacentHTML('beforeend', template(item));  
  });
}

export default Clients;