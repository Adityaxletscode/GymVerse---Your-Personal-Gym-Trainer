const params = new URLSearchParams(window.location.search);
let username = params.get("user");

if (!username) {
  username = localStorage.getItem("username");
}

const userNameSpan = document.querySelector(".user-name-span");
if (userNameSpan && username) {
  userNameSpan.textContent = username;
}

const logOutBtn = document.querySelector(".log-out");
const buttons = document.querySelectorAll(".btn-container button");
const cards = document.querySelectorAll(".card");

logOutBtn.addEventListener("click", function () {
  window.location.href = "../index.html";
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
  });
});

const sidebar = document.querySelector(".left-container");
const toggleBtn = document.querySelector(".sidebar-toggle");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("shrink");
});

if (sidebar) {
  sidebar.addEventListener("mouseenter", () => {
    const headingH1 = document.querySelector(".heading h1");
    if (headingH1) {
      headingH1.style.opacity = "0";
      headingH1.style.transition = "opacity 0.3s ease";
    }
  });
  sidebar.addEventListener("mouseleave", () => {
    const headingH1 = document.querySelector(".heading h1");
    if (headingH1) {
      headingH1.style.opacity = "1";
    }
  });
}

// Settings Submenu Logic
const settingsBtn = document.getElementById("settings-toggle");
const settingsSubmenu = document.getElementById("settings-submenu");
const darkModeBtn = document.getElementById("dark-mode-btn");
const lightModeBtn = document.getElementById("light-mode-btn");
const body = document.body;

if (settingsBtn && settingsSubmenu) {
  settingsBtn.addEventListener("click", () => {
    if (settingsSubmenu.style.display === "none" || !settingsSubmenu.style.display) {
      settingsSubmenu.style.display = "block";
    } else {
      settingsSubmenu.style.display = "none";
    }
  });
}

// Theme Logic
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  body.classList.add("light-mode");
}

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  });
}

if (lightModeBtn) {
  lightModeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  });
}
