const logOutBtn=document.querySelector('.log-out');
const welcome=document.querySelector('.welcome')
const plan=document.querySelector('.card1');
const chat=document.querySelector('.card2');
const nutrition=document.querySelector('.card3');

logOutBtn.addEventListener("click", function() {
    window.location.href = "../public/index.html";
  });

const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (username) {
  localStorage.setItem("username", username);
}

const storedUser = localStorage.getItem("username");

if (storedUser) {
  welcome.innerHTML = `Welcome, ${storedUser}!`;
}

plan.addEventListener('click', function() {
  window.location.href = `./plan.html?user=${storedUser}`;
});

chat.addEventListener('click', function() {
  window.location.href = `./chat.html?user=${storedUser}`;
});

nutrition.addEventListener('click', function() {
  window.location.href = `./nutrition.html?user=${storedUser}`;
});

const sidebar = document.querySelector('.left-container');
const toggleBtn = document.querySelector('.sidebar-toggle');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('shrink');
});
