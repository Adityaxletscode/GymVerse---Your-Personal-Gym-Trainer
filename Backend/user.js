const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  res.json({
    success: true,
    message: "Signup successful",
    name,
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password required",
    });
  }

  res.json({
    success: true,
    message: "Signin successful",
    name: "User",
  });
});

module.exports = router;
