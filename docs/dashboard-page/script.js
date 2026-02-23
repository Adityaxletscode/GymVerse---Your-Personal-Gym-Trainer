document.addEventListener("DOMContentLoaded", () => {
  const logOutBtn = document.querySelector(".log-out");
  const welcome = document.querySelector(".welcome");
  const plan = document.querySelector(".card1");
  const chat = document.querySelector(".card2");
  const nutrition = document.querySelector(".card3");
  const sidebar = document.querySelector(".left-container");
  const toggleBtn = document.querySelector(".sidebar-toggle");

  const params = new URLSearchParams(window.location.search);
  let username = params.get("user");

  if (!username) {
    username = localStorage.getItem("username");
  }

  if (!username) {
    window.location.href =
      "../login-page/index.html";
    return;
  }

  welcome.innerHTML = `Welcome, ${username}!`;
  
  const userNameSpan = document.querySelector(".user-name-span");
  if (userNameSpan) {
    userNameSpan.textContent = username;
  }

  logOutBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  plan.addEventListener("click", () => {
    window.location.href = `./plan.html?user=${encodeURIComponent(username)}`;
  });

  chat.addEventListener("click", () => {
    window.location.href = `./chat.html?user=${encodeURIComponent(username)}`;
  });

  nutrition.addEventListener("click", () => {
    window.location.href = `./nutrition.html?user=${encodeURIComponent(
      username
    )}`;
  });

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
});
