const logOutBtn=document.querySelector('.log-out');
const inputField = document.querySelector(".input-wrapper input");

logOutBtn.addEventListener("click", function() {
    window.location.href = "../public/index.html";
  });

inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const userInput = event.target.value.trim().toLowerCase().replace(/\s+/g, "-");

      const cards = document.querySelectorAll(".card");

      let found = false;

      cards.forEach(card => {
        const classes = Array.from(card.classList);
        const matchClass = classes.find(cls => cls !== 'card' && cls === userInput);

        if (matchClass) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });

          const originalBorder = card.style.border;
          card.style.border = '2px solid #00ff99';

          setTimeout(() => {
            card.style.border = originalBorder;
          }, 1500);

          found = true;
        }
      });

      if (!found) {
        alert("No matching food item found.");
      }

      inputField.value = "";
    }
  });

const sidebar = document.querySelector('.left-container');
const toggleBtn = document.querySelector('.sidebar-toggle');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('shrink');
});