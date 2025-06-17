// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // DOM이 완전히 로드된 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', heroAnimation);
  } else {
    heroAnimation();
    middleAnimation();
    slideAnimation();
    heroHistoryTitle();
    historyAnimation();
  }
};

const heroAnimation = () => {
  // DOM 요소 선택
  const DOM = {
    area: document.querySelector('.about--hero'),
    title: document.querySelector('[data-text-effect]'),
    heroDOM: document.querySelector('.about--hero'),
    lineY: document.querySelector('.lineY'),
    dotted: document.querySelector('.dotted'),
  };
  let tl;
  // DOM 요소가 존재하는지 확인
  if (!DOM.area || !DOM.title) {
    console.error('필요한 DOM 요소를 찾을 수 없습니다:', {
      area: !!DOM.area,
      title: !!DOM.title,
    });
    return;
  }

  // SplitType이 로드되었는지 확인
  if (typeof SplitType === 'undefined') {
    console.error('SplitType이 로드되지 않았습니다.');
    return;
  }

  // SplitType 인스턴스 생성
  const heroTitle = new SplitType(DOM.title, {
    types: 'lines, words',
    tagName: 'span',
  });

  // SplitType이 제대로 작동했는지 확인
  if (!heroTitle.lines || !heroTitle.words || heroTitle.lines.length === 0) {
    console.error('SplitType이 텍스트를 제대로 분할하지 못했습니다:', heroTitle);
    return;
  }

  console.log('SplitType 결과:', heroTitle); // 디버깅용

  // 초기 스타일 설정
  gsap.set(heroTitle.lines, {overflow: 'hidden'});
  gsap.set(heroTitle.words, {y: '100%'});

  // 영역 고정 (pin) 설정
  ScrollTrigger.create({
    id: 'about-vis',
    trigger: DOM.area,
    start: 'top 50',
    end: '+=200%',
    pin: true,
    // pinSpacing: false,
    // invalidateOnRefresh: true,
    // anticipatePin: 1,
  });

  // 애니메이션 타임라인 생성
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: DOM.area,
      start: '20% bottom',
      end: '+=2000',
      scrub: 1,
      id: 'main-ani',
      // markers: true, // 디버깅용 - 나중에 제거
    },
  });
  tl.to(DOM.heroDOM, {
    clipPath: 'circle(10% at 50% 50%)',
    duration: 1,
  })
    .to(DOM.heroDOM, {
      clipPath: 'circle(100% at 50% 50%)',
      duration: 1.5,
    })
    .from(DOM.dotted, {
      opacity: 0,
    })
    .from(DOM.lineY, {
      height: 0,
    })
    .to(heroTitle.lines, {
      opacity: 1,
      duration: 0.5,
    })
    .to(
      heroTitle.words,
      {
        y: '0%',
        duration: 0.5,
      },
      '<'
    );
};

const middleAnimation = () => {
  const DOM = {
    area: document.querySelector('.about--track--middle'),
    title: document.querySelector('.about--track--ci[data-text-effect]'),
    slogun01: document.querySelector('.about--track--middle--txt01'),
    slogun02: document.querySelector('.about--track--middle--txt02'),
    noImage: document.querySelector('.about--track--middle img'),
  };
  let tl;

  // SplitType 인스턴스 생성
  const middleTitle = new SplitType(DOM.title, {
    types: 'lines, words',
    tagName: 'span',
  });

  // 초기 스타일 설정
  gsap.set(middleTitle.lines, {overflow: 'hidden'});
  gsap.set(middleTitle.words, {y: '100%'});

  // 영역 고정 (pin) 설정
  ScrollTrigger.create({
    id: 'about-middle-vis',
    trigger: DOM.area,
    start: 'top top',
    end: '+=200%',
    pin: true,
    // pinSpacing: false,
    // invalidateOnRefresh: true,
    // anticipatePin: 1,
    // markers: true,
  });
  // 애니메이션 타임라인 생성
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: DOM.area,
      start: 'top center',
      end: '+=1000',
      scrub: 1,
      id: 'middle-ani',
      // markers: true, // 디버깅용
    },
  });

  tl.to(middleTitle.lines, {
    opacity: 1,
    duration: 0.5,
  })
    .from(DOM.noImage, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
    },'<')
    .to(
      middleTitle.words,
      {
        y: '0%',
        duration: 0.5,
      },
      
    )
    .from(DOM.slogun01, {
      opacity: 0,
      y: 50,
      duration: 0.5,
    })
    .from(DOM.slogun02, {
      opacity: 0,
      y: 50,
      duration: 0.5,
    })
};

const slideAnimation = () => {
  const sections = gsap.utils.toArray('.slide--section');

  const tween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    scrollTrigger: {
      trigger: '.about--slide-x',
      scrub: 1,
      pin: true,
      end: () => '+=' + innerWidth * 2,
    },
  });

  // 각 section 안의 img에 scale 애니메이션 적용
  sections.forEach(section => {
    const img = section.querySelector('img');
    if (img) {
      // 이미지 scale 애니메이션
      ScrollTrigger.create({
        trigger: section,
        start: '40% right',
        end: 'right center',
        scrub: true,
        animation: gsap.fromTo(
          img,
          { scale: 0.8 },
          { scale: 1, duration: 1, ease: 'expo' }
        ),
        containerAnimation: tween,
        //markers: true, // 필요시 활성화
      });
    }
  });

};


const heroHistoryTitle = () => {
  gsap.set('.history-title',{
    width:'80%',
    yPercent:-200
  })

  ScrollTrigger.create({
    trigger: '#historyHero',
    start: 'top top',
    end: 'bottom 20%',
    animation: gsap.to('.history-title',{width:'12%',yPercent:0}),
    scrub: true,
  })
}

const historyAnimation = () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
    const timelineContents = document.querySelectorAll('.timeline-content');
    
  
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
           
            tabButtons.forEach(btn => btn.classList.remove('active'));
            timelineContents.forEach(content => content.classList.remove('active'));
            
            
            this.classList.add('active');
            
           
            const targetContent = document.getElementById(`timeline-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
 
    const timelineItems = document.querySelectorAll('.timeline-item');
    

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
  
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
   
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach(event => {
        event.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#5ba0f2';
        });
        
        event.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#4a90e2';
        });
    });
}






// 모듈 내보내기
export default About;
