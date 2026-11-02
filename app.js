gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (!isMobile) {
  // ==========================================
  // 💻 ДЕСКТОП / ПЛАНШЕТ (ОРИГІНАЛЬНИЙ ПАРАЛАКС)
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
  // 📱 МОБІЛЬНИЙ (КАРТИНКИ ЗЛІВА, ТЕКСТИ СПРАВА)
  // ==========================================

  // 1. Фото виїжджають із лівого краю в центр, а потім ховаються назад
  gsap.utils.toArray(".mobile-anim-img").forEach((img) => {
    gsap.fromTo(
      img,
      { opacity: 0, x: -150 }, // Повністю сховано за лівим краєм
      {
        opacity: 1,
        x: 0,                  // Чітко в центрі екрана
        scrollTrigger: {
          trigger: img,
          start: "top 85%",    // Починає виїжджати знизу
          end: "center center",// Доходить до центру і стає повністю видимим
          scrub: true,         // Прив'язано до руху пальця (дихає разом зі скролом у обидва боки)
        }
      }
    );

    // Додатковий тригер для зникнення вгору
    gsap.fromTo(
      img,
      { opacity: 1, x: 0 },
      {
        opacity: 0,
        x: -150,               // Ховається за лівий край при русі вгору
        scrollTrigger: {
          trigger: img,
          start: "center center",
          end: "top 10%",
          scrub: true,
        }
      }
    );
  });

  // 2. Тексти виїжджають із правого краю в центр, а потім ховаються назад
  gsap.utils.toArray(".mobile-anim-txt").forEach((txt) => {
    gsap.fromTo(
      txt,
      { opacity: 0, x: 150 },  // Повністю сховано за правим краєм
      {
        opacity: 1,
        x: 0,                  // Чітко в центрі екрана
        scrollTrigger: {
          trigger: txt,
          start: "top 85%",
          end: "center center",
          scrub: true,
        }
      }
    );

    // Зникнення вгору праворуч
    gsap.fromTo(
      txt,
      { opacity: 1, x: 0 },
      {
        opacity: 0,
        x: 150,
        scrollTrigger: {
          trigger: txt,
          start: "center center",
          end: "top 10%",
          scrub: true,
        }
      }
    );
  });
}
