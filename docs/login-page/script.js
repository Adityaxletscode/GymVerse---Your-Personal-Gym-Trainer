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
  const DASHBOARD_URL = "../dashboard-page/index.html";



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

  let mode = "signup"; // Tracks "signup" or "signin"

  const switchMode = (newMode) => {
    mode = newMode;
    if (mode === "signup") {
      nameField.style.maxHeight = "60px";
      title.innerHTML = "Sign Up";
      text.innerHTML = "Password Suggestions";
      signUpBtn.classList.remove("disable");
      signInBtn.classList.add("disable");
      underline.style.transform = "translateX(0)";
    } else {
      nameField.style.maxHeight = "0";
      title.innerHTML = "Sign In";
      text.innerHTML = "Lost Password";
      signUpBtn.classList.add("disable");
      signInBtn.classList.remove("disable");
      underline.style.transform = "translateX(35px)";
    }
  };

  signUpBtn.addEventListener("click", async () => {
    if (mode === "signin") {
      switchMode("signup");
    } else {
      await handleAuth("/signup", signUpBtn, "Sign Up");
    }
  });

  signInBtn.addEventListener("click", async () => {
    if (mode === "signup") {
      switchMode("signin");
    } else {
      await handleAuth("/signin", signInBtn, "Sign In");
    }
  });

  async function handleAuth(endpoint, btn, originalText) {
    const nameInput = document.querySelector(".namefield input");
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[id="password"]');

    const payload = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    if (endpoint === "/signup") {
      payload.name = nameInput.value.trim();
    }

    if (!payload.email || !payload.password || (endpoint === "/signup" && !payload.name)) {
      alert("Please fill in all fields");
      return;
    }

    btn.innerText = endpoint === "/signup" ? "Signing Up..." : "Signing In...";
    btn.disabled = true;

    try {
      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({ 
        success: false, 
        message: "Server returned a non-JSON response. Check if backend is running." 
      }));

      if (res.ok && data.success) {
        alert(data.message);
        localStorage.setItem("username", data.name);
        localStorage.setItem("useremail", data.email);
        window.location.href = DASHBOARD_URL + "?user=" + encodeURIComponent(data.name);
      } else {
        alert(data.message || "Action failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network or Server error. Please try again later.");
    } finally {
      btn.innerText = originalText;
      btn.disabled = false;
    }
  }
});

