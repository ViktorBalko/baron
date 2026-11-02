gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (!isMobile) {
  // ДЕСКТОП: Твій оригінальний плавний паралакс
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
  // МОБІЛЬНИЙ: В одну колонку, картинки зліва, тексти справа + ЗВОРОТНА АНІМАЦІЯ

  // 1. Картинки вилітають зліва
  gsap.utils.toArray(".carousel__image").forEach((img) => {
    gsap.fromTo(
      img,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 85%",
          // Зворотна анімація: коли скролиш назад (вгору), елемент знову ховається
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });

  // 2. Текстові блоки вилітають справа
  gsap.utils.toArray(".carousel__text").forEach((txt) => {
    gsap.fromTo(
      txt,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: txt,
          start: "top 85%",
          // Зворотна анімація тут теж працює
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });
}
