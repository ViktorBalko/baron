gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (!isMobile) {
  // ==========================================
  // 💻 ДЕСКТОП / ПЛАНШЕТ (Твій оригінальний паралакс з боків)
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
  // 📱 МОБІЛЬНИЙ (Одна колонка + чистий Opacity-ефект)
  // ==========================================

  // Усі елементи мобільного потоку (і картинки, і тексти) плавно реагують на прозорість
  gsap.utils.toArray(".mobile-flow > *").forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0.2 }, // Нагорі або внизу елемент напівпрозорий
      {
        opacity: 1,     // У центрі екрана стає повністю видимим
        scrollTrigger: {
          trigger: item,
          start: "top 85%",      // Коли елемент знизу з'являється в полі зору
          end: "center center",  // Доходить до центру екрана — максимальна видимість
          scrub: true,           // Плавне слідування за пальцем у обидва боки
        }
      }
    );

    // Зворотне згасання, коли елемент іде вгору екрана
    gsap.fromTo(
      item,
      { opacity: 1 },
      {
        opacity: 0.2,
        scrollTrigger: {
          trigger: item,
          start: "center center",
          end: "top 15%",      // Коли піднімається вище центру — знову м'яко темніє/згасає
          scrub: true,
        }
      }
    );
  });
}
