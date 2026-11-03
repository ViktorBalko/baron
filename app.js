// gsap.registerPlugin(ScrollTrigger);

// const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

// if (!isMobile) {
//   // ДЕСКТОП: Плавний паралакс та виїзд колонок
//   gsap.registerPlugin(ScrollSmoother);
//   ScrollSmoother.create({
//     wrapper: ".wrapper",
//     content: ".content",
//     smooth: 1.5,
//     effects: true
//   });

//   gsap.fromTo(
//     ".hero-section",
//     { opacity: 1 },
//     {
//       opacity: 0,
//       scrollTrigger: {
//         trigger: ".hero-section",
//         start: "center",
//         end: "750",
//         scrub: true
//       }
//     }
//   );

//   gsap.utils.toArray(".carousel__left .carousel__item").forEach((item) => {
//     gsap.fromTo(
//       item,
//       { opacity: 0, x: -120 },
//       {
//         opacity: 1,
//         x: 0,
//         scrollTrigger: {
//           trigger: item,
//           start: "-900",
//           end: "top",
//           scrub: true
//         }
//       }
//     );
//   });

//   gsap.utils.toArray(".carousel__right .carousel__item").forEach((item) => {
//     gsap.fromTo(
//       item,
//       { opacity: 0, x: 130 },
//       {
//         opacity: 1,
//         x: 0,
//         scrollTrigger: {
//           trigger: item,
//           start: "-900",
//           end: "top",
//           scrub: true
//         }
//       }
//     );
//   });
// } else {
//   // МОБІЛЬНИЙ: Чистий нативний скрол без важких скриптів
// }

// // gsap.registerPlugin(ScrollTrigger);

// // const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

// // if (!isMobile) {
// //   // ДЕСКТОП: Твій плавний паралакс із виїздом колонок з боків
// //   gsap.registerPlugin(ScrollSmoother);
// //   ScrollSmoother.create({
// //     wrapper: ".wrapper",
// //     content: ".content",
// //     smooth: 1.5,
// //     effects: true
// //   });

// //   gsap.fromTo(
// //     ".hero-section",
// //     { opacity: 1 },
// //     {
// //       opacity: 0,
// //       scrollTrigger: {
// //         trigger: ".hero-section",
// //         start: "center",
// //         end: "750",
// //         scrub: true
// //       }
// //     }
// //   );

// //   gsap.utils.toArray(".carousel__left .carousel__item").forEach((item) => {
// //     gsap.fromTo(
// //       item,
// //       { opacity: 0, x: -120 },
// //       {
// //         opacity: 1,
// //         x: 0,
// //         scrollTrigger: {
// //           trigger: item,
// //           start: "-900",
// //           end: "top",
// //           scrub: true
// //         }
// //       }
// //     );
// //   });

// //   gsap.utils.toArray(".carousel__right .carousel__item").forEach((item) => {
// //     gsap.fromTo(
// //       item,
// //       { opacity: 0, x: 130 },
// //       {
// //         opacity: 1,
// //         x: 0,
// //         scrollTrigger: {
// //           trigger: item,
// //           start: "-900",
// //           end: "top",
// //           scrub: true
// //         }
// //       }
// //     );
// //   });
// // } else {
// //   // МОБІЛЬНИЙ: Повністю стабільний чистий скрол (анімації та роботу з візуалом беруть на себе CSS-градієнти)
// // }
gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (!isMobile) {
  // ДЕСКТОП ТА ПЛАНШЕТ (від 768px і вище): ДВІ КОЛОНКИ з плавним GSAP паралаксом
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
  // МОБІЛЬНИЙ РУШІЙ (< 768px): Легке виринання фото зліва, а тексту справа
  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".carousel__image");
    const texts = document.querySelectorAll(".carousel__text");
    const logo = document.querySelector(".img__logo");

    // Картинкам додаємо висунення зліва
    images.forEach(img => img.classList.add("mobile-slide-left"));
    
    // Тексту додаємо висунення справа
    texts.forEach(txt => txt.classList.add("mobile-slide-right"));

    if (logo) logo.classList.add("mobile-slide-left");

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    [...images, ...texts, logo].forEach(item => {
      if (item) observer.observe(item);
    });
  });
}
