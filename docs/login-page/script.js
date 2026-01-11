document.addEventListener("DOMContentLoaded", () => {
  const signUpBtn = document.querySelector(".signupbtn");
  const signInBtn = document.querySelector(".signinbtn");
  const title = document.querySelector(".title");

  const BACKEND_URL = "https://gymverse-backend-rz7f.onrender.com";
  const DASHBOARD_URL =
    "https://adityaxletscode.github.io/GymVerse---Your-Personal-Gym-Trainer/dashboard-page/index.html";

  signUpBtn.addEventListener("click", async () => {
    if (title.innerHTML !== "Sign Up") return;

    const name = document.querySelector(".namefield input").value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const res = await fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href =
        DASHBOARD_URL + "?user=" + encodeURIComponent(data.name);
    } else {
      alert(data.message);
    }
  });

  signInBtn.addEventListener("click", async () => {
    if (title.innerHTML !== "Sign In") return;

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const res = await fetch(`${BACKEND_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href =
        DASHBOARD_URL + "?user=" + encodeURIComponent(data.name);
    } else {
      alert(data.message);
    }
  });
});
