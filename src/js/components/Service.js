gsap.registerPlugin(ScrollTrigger);

const Service = () => {

  gsap.utils.toArray(".service--list--item").forEach(item => {

    const DOM = {
      headerTitle: item.querySelector('.service--list--item__content--header'),
      bodyContent: item.querySelector('.service--list--item__content--body'),
      thumbnail: item.querySelector('.service--list--item__thumbnail'),
    };

    const { headerTitle, bodyContent, thumbnail } = DOM;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'top 20%',
        scrub: 1.5, 
        markers: false, // 개발 중일 땐 true
      }
    });

    // 방어코드: 요소가 없으면 애니메이션을 추가하지 않음
    if (!item) return;

    tl.from(item, {
      autoAlpha: 0,
      y: 80,
      ease: "power2.out",
    }, 0);

    if (headerTitle) {
      tl.from(headerTitle, {
      autoAlpha: 0,
      y: 30,
      ease: "power2.out",
      }, 0.1);
    }

    if (bodyContent) {
      tl.from(bodyContent, {
      autoAlpha: 0,
      y: 30,
      ease: "power2.out",
      }, 0.2);
    }

    if (thumbnail) {
      tl.from(thumbnail, {
      autoAlpha: 0,
      x: thumbnail.classList.contains('reveal_RTR') ? 80 : -80,
      ease: "power2.out",
      }, 0.3);
    }
  });
};

export default Service;
