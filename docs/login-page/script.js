document.addEventListener("DOMContentLoaded", () => {
  const signUpBtn = document.querySelector(".signupbtn");
  const signInBtn = document.querySelector(".signinbtn");
  const title = document.querySelector(".title");

  const BACKEND_URL = "https://gymverse-backend-rz7f.onrender.com";
  const DASHBOARD_URL =
    "https://adityaxletscode.github.io/GymVerse---Your-Personal-Gym-Trainer/dashboard-page/index.html";

  if (!signUpBtn || !signInBtn) return;

  signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (title.innerHTML !== "Sign Up") return;

    const name = document.querySelector(".namefield input").value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value;

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href =
          DASHBOARD_URL + "?user=" + encodeURIComponent(data.name);
      } else {
        alert(data.message || "Sign up failed");
      }
    } catch (err) {
      alert("Server error during sign up");
      console.error(err);
    }
  });

  signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (title.innerHTML !== "Sign In") return;

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href =
          DASHBOARD_URL + "?user=" + encodeURIComponent(data.name);
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Server error during sign in");
      console.error(err);
    }
  });
});
