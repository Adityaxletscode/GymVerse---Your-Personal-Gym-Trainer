document.addEventListener("DOMContentLoaded", () => {
  const getStarted = document.querySelector(".get-started");
  const learnMore = document.querySelector(".learn-more");
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".right-container a");

  getStarted.addEventListener("click", function () {
    window.location.href = "https://gymverse-backend-rz7f.onrender.com/";
  });

  learnMore.addEventListener("click", function () {
    window.location.href = "./info.txt";
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPath ||
      (currentPath === "/" && href === "index.html") ||
      (currentPath.endsWith("/index.html") && href === "index.html")
    ) {
      link.classList.add("active");
    }
  });
});
