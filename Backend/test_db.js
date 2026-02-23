const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing connection to:', process.env.MONGODB_URI_LOGIN.replace(/:([^:@]+)@/, ':****@'));

mongoose.connect(process.env.MONGODB_URI_LOGIN)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Detailed Connection Error:', err);
    process.exit(1);
  });
