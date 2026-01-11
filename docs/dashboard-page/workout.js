const logOutBtn = document.querySelector(".log-out");
const chest = document.querySelector(".chest");
const back = document.querySelector(".back");
const shoulders = document.querySelector(".shoulders");
const legs = document.querySelector(".legs");
const arms = document.querySelector(".arms");
const core = document.querySelector(".core");

logOutBtn.addEventListener("click", function () {
  window.location.href =
    "https://adityaxletscode.github.io/GymVerse---Your-Personal-Gym-Trainer/index.html";
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
});
