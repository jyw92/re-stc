import { fetchData } from '../utils/fetchData.js';
import Tab from '../components/Tab.js';
import Dialog from '../components/Dialog.js';

const Reference = async () => {
  let data = [];

  try {
    const fetched = await fetchData('projects');
    if (!Array.isArray(fetched)) throw new Error('Invalid project data');
    data = fetched;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return;
  }

  const allProjects = [...data];
  let filteredList = [...allProjects];
  const years = [];
  let currentIndex = 0;
  const itemsPerPage = 8;
  let currentCategory = '전체';

  const icons = {
    more: /* html */ `
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
        <g clip-path="url(#clip0_49_735)">
        <path d="M7.5 1.04004V14.04" stroke="#86868C" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1 7.5H14" stroke="#86868C" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_49_735">
        <rect width="14" height="14" fill="white" transform="translate(0.5 0.5)"/>
        </clipPath>
        </defs>
      </svg>
    `,
    close: /* html */ `
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <g clip-path="url(#clip0_49_766)">
          <path d="M20.2801 0.720032L1.56006 19.44" stroke="#000001" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.56006 0.720032L20.2801 19.44" stroke="#000001" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_49_766">
            <rect width="20.16" height="20.16" fill="white" transform="translate(0.839844)"/>
          </clipPath>
        </defs>
      </svg>
    `,
    arrow: /* html */ `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10.4 3.40002L9.272 4.52802L13.736 9.00002H4V10.6H13.736L9.272 15.072L10.4 16.2L16.8 9.80002L10.4 3.40002Z" fill="#666666"/>
      </svg>
    `
  };

  const DOM = {
    referenceTabs: document.querySelector('.reference--tabs'),
    referenceTabList: document.querySelector('.reference--list'),
    loadMoreButton: document.querySelector('.more--button'),
  };

  const { referenceTabs, referenceTabList, loadMoreButton } = DOM;

  if (!referenceTabs || !referenceTabList || !loadMoreButton) {
    console.error('Reference component: one or more DOM elements not found');
    return;
  }

  allProjects.forEach((item) => {
    if (item.year) years.push(item.year);
  });

  years.unshift('전체');
  const uniqueYears = [...new Set(years)];

  const templateYear = (name) => `<button class="reference--tab" data-year="${name}">${name}</button>`;

  const templateList = (item) => {
    const { name, thumbnail, client, category, date, link, description, dialogThumbnail } = item;
    if (!name || !thumbnail || !client || !client.logo) return '';
    return `
      <button type="button" class="reference--list--item"
        data-name="${name}" 
        data-date="${date || ''}" 
        data-link="${link || ''}" 
        data-description="${description || ''}" 
        data-category="${category || ''}" 
        data-dialog-thumbnail="${dialogThumbnail || ''}">
        <img src="/src/images/projects/${thumbnail}" alt="${name}" class="thumbnail" />
        <img src="/src/images/common/${client.logo}" alt="${client.name || 'client'}" class="client--logo" />
        <p class="project--name">${name}</p>
      </button>`;
  };

  uniqueYears.forEach((year) => {
    referenceTabs.insertAdjacentHTML('beforeend', templateYear(year));
  });

  const updatePageInfo = () => {
    const page = Math.ceil(currentIndex / itemsPerPage);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
    loadMoreButton.innerHTML = `
      더보기 (${page} / ${totalPages}) ${icons.more}
    `;
    loadMoreButton.dataset.category = currentCategory || '전체';
  };

  const renderList = () => {
    const nextItems = filteredList.slice(currentIndex, currentIndex + itemsPerPage);
    nextItems.forEach((item) => {
      const html = templateList(item);
      if (html) referenceTabList.insertAdjacentHTML('beforeend', html);
    });
    currentIndex += itemsPerPage;
    updatePageInfo();

    loadMoreButton.style.display = currentIndex >= filteredList.length ? 'none' : 'flex';
  };

  const filterProjects = (year) => {
    referenceTabList.innerHTML = '';
    currentIndex = 0;
    currentCategory = year;

    filteredList = year === '전체'
      ? [...allProjects]
      : allProjects.filter((project) => project.year === year);

    renderList();
  };

  const dialogEvnetHandler = () => {
    const dialog = new Dialog();
    const dialogOpenButtons = document.querySelectorAll('.reference--list--item');
    dialogOpenButtons.forEach((item) => {
      const { name, date, link, description, dialogThumbnail, category } = item.dataset;
      item.addEventListener('click', () => {
        if (!name) return;
        dialog.open({
          closeIcon: icons.close,
          name,
          date,
          link,
          description,
          arrow: icons.arrow,
          category,
          dialogThumbnail,
        });
      });
    });
  };

  const init = () => {
    Tab(referenceTabs, {
      activeClass: '--active',
      tabClass: 'reference--tab',
    });
    dialogEvnetHandler();
  };

  filterProjects('전체');

  referenceTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.reference--tab');
    if (!tab) return;
    const selectedYear = tab.dataset.year;
    filterProjects(selectedYear);
    dialogEvnetHandler();
  });

  loadMoreButton.addEventListener('click', () => {
    renderList();
    dialogEvnetHandler(); // in case new items need event binding
  });

  init();
};

export default Reference;
