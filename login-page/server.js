const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./user");

const app = express();

/* ---------- Middlewares ---------- */
app.use(
  cors({
    origin: "*", // replace with frontend URL later
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.static("public"));

/* ---------- MongoDB Connection ---------- */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => console.log("✅ MongoDB connected"));
db.on("error", (err) => console.error("❌ MongoDB error:", err));

/* ---------- Routes ---------- */

// Health check (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("GymVerse Backend is Running 🚀");
});

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(200).json({
      success: true,
      message: "Signup successful",
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});

// Signin
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Signin successful",
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Signin failed",
    });
  }
});

/* ---------- Server ---------- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
