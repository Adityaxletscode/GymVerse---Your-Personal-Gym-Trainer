document.addEventListener("DOMContentLoaded", () => {
  const getStarted = document.querySelector(".get-started");

  if (getStarted) {
    getStarted.addEventListener("click", function () {
      window.location.href = "https://gymverse-backend-rz7f.onrender.com/";
    });
  }

  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".left-container a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPath ||
      (currentPath === "/" && href === "features.html") ||
      (currentPath.endsWith("/features.html") && href === "features.html")
    ) {
      link.classList.add("active");
    }
  });
});
