document.addEventListener("DOMContentLoaded", () => {
  const usernameElement = document.getElementById("username");
  const userFromURL = new URLSearchParams(window.location.search).get("user");

  if (usernameElement && userFromURL) {
    usernameElement.innerText = userFromURL;
  }

  const signUpBtn = document.querySelector(".signupbtn");
  const signInBtn = document.querySelector(".signinbtn");
  const nameField = document.querySelector(".namefield");
  const title = document.querySelector(".title");
  const underline = document.querySelector(".underline");
  const text = document.querySelector(".text");
  const clickLink = document.getElementById("click-link");
  const passwordField = document.querySelector('input[type="password"]');
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (!signUpBtn || !signInBtn) return;

  const BACKEND_URL = "https://gymverse-backend-rz7f.onrender.com";
  const DASHBOARD_URL =
    "https://adityaxletscode.github.io/GymVerse---Your-Personal-Gym-Trainer/dashboard-page/index.html";

  signInBtn.addEventListener("click", () => {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    text.innerHTML = "Lost Password";
    signUpBtn.classList.add("disable");
    signInBtn.classList.remove("disable");
    underline.style.transform = "translateX(35px)";
  });

  signUpBtn.addEventListener("click", () => {
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    text.innerHTML = "Password Suggestions";
    signUpBtn.classList.remove("disable");
    signInBtn.classList.add("disable");
    underline.style.transform = "translateX(0)";
  });

  clickLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (title.innerHTML === "Sign Up") {
      const suggestedPassword = generatePassword(8);
      alert("Suggested Password: " + suggestedPassword);
      passwordField.value = suggestedPassword;
    } else {
      const email = document.querySelector('input[type="email"]').value;
      if (email) {
        alert("Password reset link sent to your email: " + email);
      } else {
        alert("Please enter your email to receive a reset link.");
      }
    }
  });

  function generatePassword(length) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

  signUpBtn.addEventListener("click", async () => {
    if (title.innerHTML === "Sign Up") {
      const name = document.querySelector(".namefield input").value;
      const email = document.querySelector('input[type="email"]').value;
      const password = document.querySelector('input[type="password"]').value;

      try {
        const res = await fetch(`${BACKEND_URL}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          alert(data.message);
          localStorage.setItem("username", data.name);
          window.location.href =
            DASHBOARD_URL + "?user=" + encodeURIComponent(data.name);
        } else {
          alert(data.message || "Sign-up failed");
        }
      } catch (err) {
        alert("Error signing up.");
        console.error(err);
      }
    }
  });

  signInBtn.addEventListener("click", async () => {
    if (title.innerHTML === "Sign In") {
      const email = document.querySelector('input[type="email"]').value;
      const password = document.querySelector('input[type="password"]').value;

      try {
        const res = await fetch(`${BACKEND_URL}/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          alert(data.message);
          localStorage.setItem("username", data.name);
          window.location.href =
            DASHBOARD_URL + "?user=" + encodeURIComponent(data.name);
        } else {
          alert(data.message || "Invalid credentials");
        }
      } catch (err) {
        alert("Error signing in.");
        console.error(err);
      }
    }
  });
});
