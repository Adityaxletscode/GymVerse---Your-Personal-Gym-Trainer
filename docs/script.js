document.addEventListener("DOMContentLoaded", () => {
  const getStarted = document.querySelector(".get-started");

  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".right-container a");

  getStarted.addEventListener("click", function () {
    window.location.href = "./login-page/index.html";
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
