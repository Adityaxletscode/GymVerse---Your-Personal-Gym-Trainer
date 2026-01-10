document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".left-container a");
  const getStarted = document.querySelector(".get-started");
  const buttons = document.querySelectorAll(".mid-container button");
  const cards = document.querySelectorAll(".card");
  const heading = document.querySelectorAll(".heading2");

  // ✅ Safety check (prevents crashes)
  if (getStarted) {
    getStarted.addEventListener("click", function () {
      window.location.href = "https://gymverse-backend-rz7f.onrender.com/";
    });
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPath ||
      (currentPath === "/" && href === "classes.html") ||
      (currentPath.endsWith("/classes.html") && href === "classes.html")
    ) {
      link.classList.add("active");
    }
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const level = button.textContent.trim().toLowerCase();

      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      cards.forEach((card) => {
        const cardLevel = card.getAttribute("data-level");
        const shouldShow = level === "all" || cardLevel === level;

        if (shouldShow) {
          const wasHidden =
            card.style.display === "none" ||
            window.getComputedStyle(card).display === "none";

          card.style.display = "block";

          if (wasHidden) {
            card.classList.remove("fade-in");
            card.classList.add("fade-in");
          }
        } else {
          card.style.display = "none";
        }
      });

      heading.forEach((h) => {
        const section = h.nextElementSibling;
        const visibleCards = Array.from(section.querySelectorAll(".card")).some(
          (card) => card.style.display !== "none"
        );

        h.style.display = visibleCards ? "block" : "none";
        section.style.display = visibleCards ? "flex" : "none";
      });
    });
  });
});
