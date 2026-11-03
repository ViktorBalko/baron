gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (!isMobile) {
  // ДЕСКТОП ТА ПЛАНШЕТ: Еталонний паралакс (два боки) + ScrollSmoother
  gsap.registerPlugin(ScrollSmoother);
  ScrollSmoother.create({
    wrapper: ".wrapper",
    content: ".content",
    smooth: 1.5,
    effects: true
  });

  gsap.fromTo(
    ".hero-section",
    { opacity: 1 },
    {
      opacity: 0,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "center",
        end: "750",
        scrub: true
      }
    }
  );

  gsap.utils.toArray(".carousel__left .carousel__item").forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: -120 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: "-900",
          end: "top",
          scrub: true
        }
      }
    );
  });

  gsap.utils.toArray(".carousel__right .carousel__item").forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: 130 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: "-900",
          end: "top",
          scrub: true
        }
      }
    );
  });
} else {
  // МОБІЛЬНИЙ РУШІЙ (< 768px): Шахматне висунення + поява рядків при скролі (прямий і зворотний)
  document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -5% 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        window.requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.querySelectorAll(".reveal-line").forEach(l => l.classList.add("is-visible"));
          } else {
            entry.target.classList.remove("is-visible");
            entry.target.querySelectorAll(".reveal-line").forEach(l => l.classList.remove("is-visible"));
          }
        });
      });
    }, observerOptions);

    document.querySelectorAll(".carousel__item, .img__logo").forEach(item => {
      if (item) observer.observe(item);
    });
  });
}
