document.addEventListener("DOMContentLoaded", () => {
  const logOutBtn = document.querySelector(".log-out");
  const welcome = document.querySelector(".welcome");
  const plan = document.querySelector(".card1");
  const chat = document.querySelector(".card2");
  const nutrition = document.querySelector(".card3");
  const sidebar = document.querySelector(".left-container");
  const toggleBtn = document.querySelector(".sidebar-toggle");

  const params = new URLSearchParams(window.location.search);
  const username = params.get("user");

  if (!username) {
    window.location.href =
      "https://adityaxletscode.github.io/GymVerse---Your-Personal-Gym-Trainer/login-page/index.html";
    return;
  }

  welcome.innerHTML = `Welcome, ${username}!`;

  logOutBtn.addEventListener("click", () => {
    window.location.href =
      "https://adityaxletscode.github.io/GymVerse---Your-Personal-Gym-Trainer/index.html";
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
  });
});
