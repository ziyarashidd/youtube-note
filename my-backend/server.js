const express = require('express');
// const mongoose = require('mongoose');
const mongoose = require('mongoose');
<<<<<<< HEAD
const bcrypt = require('bcryptjs');
=======
const bcrypt = require('bcrypt');
>>>>>>> aaaac12511175d1110ed7a5a80d57a1b84e22569
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const dotenv = require('dotenv')
require('dotenv').config();


// Create an Express app
const app = express();


// Enable CORS for requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Allow only requests from this origin
  methods: ['GET', 'POST'],       // Allow only specific HTTP methods (optional)
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers (optional)
}));

// Middleware for parsing incoming request bodies
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
let uri = process.env.MONGODB_URL
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
  // Extract username and password from the request body
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // Find the user by the provided username
    const adminUser = await AdminUser.findOne({ username });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, adminUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // If login is successful
    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for registering new admin user (for testing purposes)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // Check if the admin user already exists
    const existingUser = await AdminUser.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
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
