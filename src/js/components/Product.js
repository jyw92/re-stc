const Product = () => {
  // Scroll Animation System
class ScrollAnimations {
  constructor() {
    this.observers = new Map()
    this.animatedElements = new Set()
    this.init()
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupAnimations())
    } else {
      this.setupAnimations()
    }
  }

  setupAnimations() {
    // Create different observers for different animation types
    this.createObserver("fade-in", {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    })

    this.createObserver("slide-up", {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    })

    this.createObserver("slide-left", {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    })

    this.createObserver("slide-right", {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    })

    this.createObserver("scale-in", {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    })

    this.createObserver("stagger", {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    })

    // Setup elements
    this.setupElements()

    // Add CSS classes for animations
    this.addAnimationStyles()
  }

  createObserver(animationType, options) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target, animationType)
          this.animatedElements.add(entry.target)
        }
      })
    }, options)

    this.observers.set(animationType, observer)
  }

  setupElements() {
    // Hero section elements
    this.observeElement(".hero h1", "fade-in", 0)
    this.observeElement(".hero p", "fade-in", 200)
    this.observeElement(".hero .btn", "fade-in", 400)
    this.observeElement(".hero .dashboard", "slide-up", 600)

    // Features section
    this.observeElement(".section-header", "fade-in")
    this.observeElements(".feature-card", "stagger")

    // Products section
    this.observeElements(".product:nth-child(odd) .product__content", "slide-left")
    this.observeElements(".product:nth-child(odd) .product__demo", "slide-right")
    this.observeElements(".product:nth-child(even) .product__content", "slide-right")
    this.observeElements(".product:nth-child(even) .product__demo", "slide-left")

    // About section
    this.observeElement(".about .about__text", "slide-left")
    this.observeElement(".about .about__visual", "slide-right")

    // Testimonials
    this.observeElements(".testimonial-card", "stagger")

    // Contact section
    this.observeElement(".contact .contact__form-container", "scale-in")

    // Stats and metrics
    this.observeElements(".stat-card", "stagger")
    this.observeElements(".metric", "stagger")
  }

  observeElement(selector, animationType, delay = 0) {
    const element = document.querySelector(selector)
    if (element) {
      element.style.transitionDelay = `${delay}ms`
      this.observers.get(animationType)?.observe(element)
    }
  }

  observeElements(selector, animationType) {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${index * 100}ms`
      this.observers.get(animationType)?.observe(element)
    })
  }

  animateElement(element, animationType) {
    switch (animationType) {
      case "fade-in":
        element.classList.add("animate-fade-in")
        break
      case "slide-up":
        element.classList.add("animate-slide-up")
        break
      case "slide-left":
        element.classList.add("animate-slide-left")
        break
      case "slide-right":
        element.classList.add("animate-slide-right")
        break
      case "scale-in":
        element.classList.add("animate-scale-in")
        break
      case "stagger":
        element.classList.add("animate-stagger")
        break
    }
  }

  addAnimationStyles() {
    const style = document.createElement("style")
    style.textContent = `
      /* Base animation setup */
      [class*="animate-"] {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Fade In Animation */
      .hero h1,
      .hero p,
      .hero .btn,
      .section-header {
        opacity: 0;
        transform: translateY(20px);
      }

      .animate-fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* Slide Up Animation */
      .hero .dashboard {
        opacity: 0;
        transform: translateY(60px);
      }

      .animate-slide-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* Slide Left Animation */
      .product__content,
      .about__text {
        opacity: 0;
        transform: translateX(-50px);
      }

      .animate-slide-left {
        opacity: 1 !important;
        transform: translateX(0) !important;
      }

      /* Slide Right Animation */
      .product__demo,
      .about__visual {
        opacity: 0;
        transform: translateX(50px);
      }

      .animate-slide-right {
        opacity: 1 !important;
        transform: translateX(0) !important;
      }

      /* Scale In Animation */
      .contact__form-container {
        opacity: 0;
        transform: scale(0.9);
      }

      .animate-scale-in {
        opacity: 1 !important;
        transform: scale(1) !important;
      }

      /* Stagger Animation */
      .feature-card,
      .testimonial-card,
      .stat-card,
      .metric {
        opacity: 0;
        transform: translateY(30px);
      }

      .animate-stagger {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* Smooth transitions for interactive elements */
      .feature-card,
      .testimonial-card {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    border-color 0.3s ease,
                    transform 0.3s ease !important;
      }

      .feature-card:hover,
      .testimonial-card:hover {
        transform: translateY(-4px) !important;
      }

      /* Chart animations */
      .chart-bar {
        transform: scaleY(0);
        transform-origin: bottom;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .animate-chart-bar {
        transform: scaleY(1);
      }

      /* Counter animations */
      .stat-card__value,
      .metric strong {
        transition: all 0.3s ease;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        [class*="animate-"] {
          transition-duration: 0.6s;
        }
        
        .product__content,
        .product__demo {
          transform: translateY(30px) !important;
        }
        
        .animate-slide-left,
        .animate-slide-right {
          transform: translateY(0) !important;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        [class*="animate-"] {
          transition-duration: 0.01ms !important;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// Chart Animation System
class ChartAnimations {
  constructor() {
    this.charts = []
    this.init()
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupCharts())
    } else {
      this.setupCharts()
    }
  }

  setupCharts() {
    // Animate chart bars when they come into view
    const chartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateChart(entry.target)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all chart containers
    const charts = document.querySelectorAll(".chart__bars, .dashboard__chart")
    charts.forEach((chart) => {
      chartObserver.observe(chart)
    })
  }

  animateChart(chartContainer) {
    const bars = chartContainer.querySelectorAll(".chart-bar")
    bars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add("animate-chart-bar")
      }, index * 100)
    })
  }
}

// Counter Animation System
class CounterAnimations {
  constructor() {
    this.counters = []
    this.init()
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupCounters())
    } else {
      this.setupCounters()
    }
  }

  setupCounters() {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target)
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      },
    )

    // Find all elements with numbers to animate
    // const counters = document.querySelectorAll(".stat-card__value, .about__stat .stat-number")
    // counters.forEach((counter) => {
    //   counterObserver.observe(counter)
    // })
  }

  animateCounter(element) {
    const text = element.textContent
    const number = text.match(/[\d,]+/)

    if (number) {
      const finalValue = Number.parseInt(number[0].replace(/,/g, ""))
      const prefix = text.split(number[0])[0]
      const suffix = text.split(number[0])[1]

      this.countUp(element, 0, finalValue, prefix, suffix, 2000)
    }
  }

  countUp(element, start, end, prefix = "", suffix = "", duration = 2000) {
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (end - start) * easeOutQuart)

      element.textContent = prefix + current.toLocaleString() + suffix

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }
}

// Parallax Effect System
class ParallaxEffects {
  constructor() {
    this.elements = []
    this.ticking = false
    this.init()
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup())
    } else {
      this.setup()
    }
  }

  setup() {
    // Setup parallax elements
    this.setupParallaxElements()

    // Listen to scroll events
    window.addEventListener("scroll", () => this.requestTick())

    // Initial update
    this.update()
  }

  setupParallaxElements() {
    // Add parallax to background elements
    const backgrounds = document.querySelectorAll(".hero__background, .features::before, .products::before")
    backgrounds.forEach((bg) => {
      this.elements.push({
        element: bg,
        speed: 0.5,
        type: "background",
      })
    })
  }

  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.update())
      this.ticking = true
    }
  }

  update() {
    const scrollTop = window.pageYOffset

    this.elements.forEach((item) => {
      const { element, speed, type } = item
      const yPos = -(scrollTop * speed)

      if (type === "background") {
        element.style.transform = `translateY(${yPos}px)`
      }
    })

    this.ticking = false
  }
}

// Smooth Scroll System
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup())
    } else {
      this.setup()
    }
  }

  setup() {
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleClick(e))
    })
  }

  handleClick(e) {
    e.preventDefault()

    const targetId = e.currentTarget.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const headerHeight = document.querySelector(".header")?.offsetHeight || 0
      const targetPosition = targetElement.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    this.init()
  }

  init() {
    // Disable animations if user prefers reduced motion
    if (this.isReducedMotion) {
      this.disableAnimations()
    }

    // Monitor performance
    this.monitorPerformance()
  }

  disableAnimations() {
    const style = document.createElement("style")
    style.textContent = `
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `
    document.head.appendChild(style)
  }

  monitorPerformance() {
    // Throttle animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.documentElement.classList.add("low-performance")
    }
  }
}

// Initialize all animation systems
class AnimationManager {
  constructor() {
    this.systems = []
    this.init()
  }

  init() {
    // Initialize performance monitor first
    this.systems.push(new PerformanceMonitor())

    // Initialize animation systems
    this.systems.push(new ScrollAnimations())
    this.systems.push(new ChartAnimations())
    this.systems.push(new CounterAnimations())
    this.systems.push(new ParallaxEffects())
    this.systems.push(new SmoothScroll())

    console.log("🎬 Animation systems initialized")
  }

  destroy() {
    // Cleanup if needed
    this.systems.forEach((system) => {
      if (system.destroy) {
        system.destroy()
      }
    })
  }
}

// Auto-initialize when script loads
const animationManager = new AnimationManager()

// Export for potential external use
window.AnimationManager = AnimationManager

}

export default Product;