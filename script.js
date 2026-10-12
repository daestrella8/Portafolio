document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const nav = document.getElementById("mainNav");
  if (nav && window.bootstrap) {
    nav.querySelectorAll("a.nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 991.98px)").matches) {
          const menu = bootstrap.Collapse.getInstance(nav);
          if (menu) menu.hide();
        }
      });
    });
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const sections = document.querySelectorAll(
    ".section-heading, .about-panel, .project-card, .skill-pill, .cv-panel",
  );
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.body.classList.add("reveal-ready");
    sections.forEach((item) => item.classList.add("reveal-on-scroll"));
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    sections.forEach((item) => observer.observe(item));
  }
});
