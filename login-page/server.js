const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./user');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/GymVerseDB');

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Signup request received:', { name, email });

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ success: false, message: 'User already exists', name: existingUser.name });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('User signed up successfully');
    res.status(200).json({ success: true, message: 'User signed up successfully', name: user.name });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Error signing up' });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({ success: true, message: 'User signed in successfully', name: user.name });

  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ success: false, message: 'Error signing in' });
  }
});

app.listen(4000, '0.0.0.0', () => console.log('Server started on http://localhost:4000'));
