gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (!isMobile) {
  // ДЕСКТОП: Твій оригінальний паралакс
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
  // МОБІЛЬНИЙ: Картинки вилітають зліва, тексти — справа, і все йде в одну колонку
  
  // 1. Усі картинки летять зліва
  gsap.utils.toArray(".carousel__image").forEach((img) => {
    gsap.fromTo(
      img,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // 2. Усі текстові блоки летять справа
  gsap.utils.toArray(".carousel__text").forEach((txt) => {
    gsap.fromTo(
      txt,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: txt,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Hero секція на мобільному
  gsap.fromTo(
    ".hero-section",
    { opacity: 0 },
    { opacity: 1, duration: 1 }
  );
}
