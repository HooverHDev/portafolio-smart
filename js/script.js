document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Cerrar navegación" : "Abrir navegación");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir navegación");
    }));
  }

  document.querySelectorAll(".carousel").forEach(carousel => {
    const slides = [...carousel.querySelectorAll(".carousel-slide")];
    const dots = [...carousel.querySelectorAll(".carousel-dot")];
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");
    if (!slides.length) return;
    let current = 0;
    const show = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    };
    prevButton?.addEventListener("click", () => show(current - 1));
    nextButton?.addEventListener("click", () => show(current + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));
    carousel.addEventListener("keydown", event => {
      if (event.key === "ArrowRight") show(current + 1);
      if (event.key === "ArrowLeft") show(current - 1);
    });
  });
});