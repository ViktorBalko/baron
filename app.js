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
  // 📱 МОБІЛЬНИЙ (Плавне згасання лише у перших та останніх 10% екрана)
  // ==========================================

  gsap.utils.toArray(".mobile-flow > *").forEach((item) => {
    // 1. Поява знизу: коли елемент заходить у нижні 10% екрана (start: "top 90%")
    gsap.fromTo(
      item,
      { opacity: 0.2 },
      {
        opacity: 1,
        duration: 0.4,
        scrollTrigger: {
          trigger: item,
          start: "top 90%", // Спрацьовує, коли верх елемента досягає 90% висоти в'юпорта
          toggleActions: "play reverse play reverse", // Працює і вгору, і вниз
        }
      }
    );

    // 2. Зникнення зверху: коли елемент доходить до верхніх 10% екрана
    gsap.fromTo(
      item,
      { opacity: 1 },
      {
        opacity: 0.2,
        duration: 0.4,
        scrollTrigger: {
          trigger: item,
          start: "top 10%", // Спрацьовує, коли верх елемента підіймається до 10% в'юпорта
          end: "bottom 10%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  });
}
