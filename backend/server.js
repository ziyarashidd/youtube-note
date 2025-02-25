const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

// Create an Express app
const app = express();

// Enable CORS for requests from localhost:3000 and your Vercel app
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'https://youtube-login.vercel.app'];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies or credentials to be sent
}));

// Middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let uri = process.env.MONGODB_URL;

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Define the AdminUser schema
const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create a model for the admin user
const AdminUser = mongoose.model('AdminUser', adminUserSchema);

// POST route to handle login
app.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const adminUser = await AdminUser.findOne({ username });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for registering new admin user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const existingUser = await AdminUser.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new AdminUser({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Admin user registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
