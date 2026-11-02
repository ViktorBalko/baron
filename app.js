gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (!isMobile) {
  // ==========================================
  // 💻 ДЕСКТОП / ПЛАНШЕТ (Твій паралакс)
  // ==========================================
  gsap.registerPlugin(ScrollSmoother);
  ScrollSmoother.create({
    wrapper: ".wrapper",
    content: ".content",
    smooth: 1.5,
    effects: true
  });

  gsap.fromTo(
    ".desktop-layout .hero-section",
    { opacity: 1 },
    {
      opacity: 0,
      scrollTrigger: {
        trigger: ".desktop-layout .hero-section",
        start: "center",
        end: "750",
        scrub: true
      }
    }
  );

  gsap.utils.toArray(".desktop-layout .carousel__left .carousel__item").forEach((item) => {
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

  gsap.utils.toArray(".desktop-layout .carousel__right .carousel__item").forEach((item) => {
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
  // ==========================================
  // 📱 МОБІЛЬНИЙ (Зона прозорості у верхніх та нижніх 25%)
  // ==========================================

  gsap.utils.toArray(".mobile-flow > *").forEach((item) => {
    // 1. Поява з нижніх 25% екрана
    gsap.fromTo(
      item,
      { opacity: 0.2 },
      {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: item,
          start: "top 75%", // Починає світлішати, коли доходить до нижньої чверті (25% знизу / 75% від верху)
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // 2. Затемнення у верхніх 25% екрана
    gsap.fromTo(
      item,
      { opacity: 1 },
      {
        opacity: 0.2,
        duration: 0.5,
        scrollTrigger: {
          trigger: item,
          start: "top 25%", // Починає темніти, коли підіймається у верхню чверть екрана
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  });
}
