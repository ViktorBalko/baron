gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (!isMobile) {
  // ДЕСКТОП ТА ПЛАНШЕТ: Еталонний двоколонковий паралакс із ScrollSmoother
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
  // МОБІЛЬНИЙ РУШІЙ (< 768px): Плавний потік під пальцем (scrub) із правильним порядком пар
  const allItems = gsap.utils.toArray(".carousel__item");

  allItems.forEach((item, index) => {
    const xDirection = index % 2 === 0 ? -70 : 70; // Шахматний виїзд зліва/справа

    gsap.fromTo(
      item,
      { opacity: 0, x: xDirection },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "top 45%",
          scrub: 0.5 // Повна прив'язка до скролу пальця
        }
      }
    );
  });

  const logo = document.querySelector(".img__logo");
  if (logo) {
    gsap.fromTo(
      logo,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: logo,
          start: "top 95%",
          end: "top 60%",
          scrub: 0.5
        }
      }
    );
  }
}
