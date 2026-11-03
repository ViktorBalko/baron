gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

// Функція для загортання тексту в рядки для ефекту друкарської машинки
function initTextReveal() {
  const headings = document.querySelectorAll(".carousel__text-head, .carousel__text-paragraph");
  headings.forEach(el => {
    if (el.dataset.revealed) return;
    const text = el.innerText;
    el.innerHTML = `<span class="reveal-line"><span>${text}</span></span>`;
    el.dataset.revealed = "true";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTextReveal();
});

if (!isMobile) {
  // ДЕСКТОП ТА ПЛАНШЕТ (від 768px): Дві колонки, парний симетричний паралакс через GSAP
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

  // Парний синхронний рух колонок
  gsap.utils.toArray(".carousel__left .carousel__item").forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: "-850",
          end: "top",
          scrub: true
        }
      }
    );
  });

  gsap.utils.toArray(".carousel__right .carousel__item").forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: "-850",
          end: "top",
          scrub: true
        }
      }
    );
  });

  // Активація появи рядків тексту на десктопі
  gsap.utils.toArray(".carousel__text").forEach((textBlock) => {
    ScrollTrigger.create({
      trigger: textBlock,
      start: "top 80%",
      onEnter: () => textBlock.querySelectorAll(".reveal-line").forEach(l => l.classList.add("is-visible")),
      onLeaveBack: () => textBlock.querySelectorAll(".reveal-line").forEach(l => l.classList.remove("is-visible"))
    });
  });

} else {
  // МОБІЛЬНИЙ РУШІЙ (< 768px): Шахматні пари (Фото/Текст чергуються зліва і справа) + звороти
  document.addEventListener("DOMContentLoaded", () => {
    // Знаходимо всі елементи по порядку: [Фото1, Текст1, Фото2, Текст2, Фото3...]
    const allCarouselItems = document.querySelectorAll(".carousel__item");

    allCarouselItems.setItem = (index, direction) => {
      // Якщо парний індекс (0, 2, 4...) — йде зліва, непарний (1, 3, 5...) — справа
    };

    allCarouselItems.forEach((item, index) => {
      // Шахматний порядок: парні виринають зліва, непарні справа
      if (index % 2 === 0) {
        item.classList.add("mobile-pair-left");
      } else {
        item.classList.add("mobile-pair-right");
      }
    });

    const logo = document.querySelector(".img__logo");
    if (logo) logo.classList.add("mobile-pair-left");

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -5% 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        window.requestAnimationFrame(() => {
          const textContainer = entry.target.querySelector ? entry.target : null;
          
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Запускаємо анімацію рядків тексту всередині блоку
            entry.target.querySelectorAll(".reveal-line").forEach(l => l.classList.add("is-visible"));
            if (entry.target.classList.contains("carousel__text")) {
              entry.target.querySelectorAll(".reveal-line").forEach(l => l.classList.add("is-visible"));
            }
          } else {
            entry.target.classList.remove("is-visible");
            entry.target.querySelectorAll(".reveal-line").forEach(l => l.classList.remove("is-visible"));
          }
        });
      });
    }, observerOptions);

    [...allCarouselItems, logo].forEach(item => {
      if (item) {
        // Якщо це текстовий блок, також чіпляємо спостерігач на внутрішні рядки
        observer.observe(item);
      }
    });
  });
}
