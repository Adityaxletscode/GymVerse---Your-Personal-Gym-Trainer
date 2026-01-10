document.addEventListener("DOMContentLoaded", function () {

  const usernameSpan = document.querySelector('.username');
  const params = new URLSearchParams(window.location.search);
  const logOutBtn = document.querySelector('.log-out');
  const username = params.get("user");

  const calcBtn = document.getElementById('calculate-btn');
  const bmiCard = document.getElementById('bmi-input-card');
  const bmiResultCard = document.getElementById('bmi-result-card');
  const bmiValue = document.getElementById('bmi-value');
  const bmiCondition = document.getElementById('bmi-condition');
  const goal = document.getElementById('goal');
  const plan = document.getElementById('weeklyPlan');

  const continueBtn = document.querySelectorAll('.yourplanBtn');
  const timerCard = document.getElementById('timer-card');

  const count = document.querySelector(".countdownTimer");

  const warmUpCard = document.querySelector('.warmUp');

  const completeBtn = document.querySelectorAll(".completed");

  if (username) {
    localStorage.setItem("username", username);
  }
  const storedUser = localStorage.getItem("username");
  usernameSpan.textContent = storedUser || "Guest";

  logOutBtn.addEventListener("click", function () {
    window.location.href = "../public/index.html";
  });

  const genderSelect = document.getElementById('gender');

  genderSelect.addEventListener('change', function () {
    this.style.color = 'white';
  });

  let currentBmiCategory = '';

  calcBtn.addEventListener('click', () => {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0) {
      alert("Please enter valid height and weight.");
      return;
    }

    const bmi = weight / ((height / 100) ** 2);
    bmiValue.textContent = bmi.toFixed(1);

    let condition = '';
    let userGoal = '';

    if (bmi < 18.5) {
      condition = 'You are underweight';
      currentBmiCategory = 'underweight';
    } else if (bmi < 25) {
      condition = 'You are normal weight';
      currentBmiCategory = 'normal';
    } else if (bmi < 30) {
      condition = 'You are overweight';
      currentBmiCategory = 'overweight';
    } else {
      condition = 'You are obese';
      currentBmiCategory = 'obese';
    }

    bmiCondition.textContent = condition;

    bmiCard.style.display = 'none';
    bmiResultCard.style.display = 'block';
  });

const createPlanBtn = document.getElementById("create-plan-btn");
createPlanBtn.addEventListener("click", function () {
  const bmiCategory = document.getElementById("bmi-condition").innerText.trim().toLowerCase();

  if (bmiCategory.includes("underweight")) {
    document.querySelector(".your-plan.underweight").style.display = "block";
  } else if (bmiCategory.includes("normal")) {
    document.querySelector(".your-plan.normal").style.display = "block";
  } else if (bmiCategory.includes("overweight")) {
    const overweightPlan = document.querySelector(".your-plan.overweight");
    if (overweightPlan) {
      overweightPlan.style.display = "block";
    }
  } else if (bmiCategory.includes("obese")) {
    const obesePlan = document.querySelector(".your-plan.obese");
    if (obesePlan) {
      obesePlan.style.display = "block";
    }
  }

  bmiResultCard.style.display = 'none';
});



continueBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.your-plan').forEach(plan => {
      plan.style.display = 'none';
    });

    timerCard.style.display = 'flex';
    startCountdown(10);
  });
});


  function startCountdown(durationInSeconds) {
    let time = durationInSeconds;

    const interval = setInterval(() => {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      count.innerHTML = `${minutes}:${seconds}`;
      time--;

      if (time < 0) {
        clearInterval(interval);
        timerCard.style.display = 'none';
        warmUpCard.style.display = 'flex';
        warmUpCard.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  }

  completeBtn.forEach((button, index) => {
    button.addEventListener('click', function () {
      this.textContent = '✅ Completed!';
      this.style.backgroundColor = '#28a745';
      this.style.borderColor = '#1e7e34';
      this.style.color = 'white';
      this.disabled = true;

      const currentSection = this.closest('.exercise');
      let nextSection = currentSection.nextElementSibling;

      while (nextSection && !nextSection.classList.contains('exercise')) {
        nextSection = nextSection.nextElementSibling;
      }

      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (index === completeBtn.length - 1) {
        setTimeout(() => {
          if (currentBmiCategory === 'underweight') {
            window.location.href = './underweight.html';
          } else if (currentBmiCategory === 'normal') {
            window.location.href = './normal.html';
          } else if (currentBmiCategory === 'overweight') {
            window.location.href = './overweight.html';
          } else if (currentBmiCategory === 'obese') {
            window.location.href = './obese.html';
          }
        }, 1000);
      }
    });
  });
});

const sidebar = document.querySelector('.left-container');
const toggleBtn = document.querySelector('.sidebar-toggle');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('shrink');
});