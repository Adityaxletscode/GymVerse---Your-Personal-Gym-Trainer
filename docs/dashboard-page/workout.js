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
const chest = document.querySelector(".chest");
const back = document.querySelector(".back");
const shoulders = document.querySelector(".shoulders");
const legs = document.querySelector(".legs");
const arms = document.querySelector(".arms");
const core = document.querySelector(".core");

logOutBtn.addEventListener("click", function () {
  window.location.href = "../index.html";
});

chest.addEventListener("click", function () {
  window.location.href = "./chest.html";
});

back.addEventListener("click", function () {
  window.location.href = "./back.html";
});

shoulders.addEventListener("click", function () {
  window.location.href = "./shoulder.html";
});

legs.addEventListener("click", function () {
  window.location.href = "./legs.html";
});

arms.addEventListener("click", function () {
  window.location.href = "./arms.html";
});

core.addEventListener("click", function () {
  window.location.href = "./core.html";
});

const sidebar = document.querySelector(".left-container");
const toggleBtn = document.querySelector(".sidebar-toggle");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("shrink");
  document.querySelector('.header').classList.toggle('shrink');
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
