const Tab = (target, options = {}) => {
  const config = {
    activeClass: '--active',
    tabClass: 'tabClassName',
    ...options,
  }

  const { activeClass, tabClass } = config;

  const DOM = {
     tabwrap:target,
     tabs:target.querySelectorAll(`.${tabClass}`),
  }
  
  const { tabwrap, tabs } = DOM;

  if (!tabwrap) {
    console.error(`Tab component: target element not found`);
    return;
  }

  const removeActiveClass = () => {
    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }

  const setActiveClass = (index) => {
    tabs[index].classList.add(activeClass);
  } 
  const handleClick = (e) => {
    const target = e.target.closest(`.${tabClass}`);
    if (!target) return;
    const index = Array.from(tabs).indexOf(target);
    removeActiveClass();
    setActiveClass(index);
  }
  const init = () => {
    removeActiveClass();
    setActiveClass(0);
    tabwrap.addEventListener('click', handleClick);
  }

  init();
}
export default Tab;