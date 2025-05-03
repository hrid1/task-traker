const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.singup = async (req, res) => {
  const { name, email, password, country } = req.body;
  // validation
  if (!name || !email || !password || !country) {
    return res.status(201).json({
      success: false,
      message: "Need all field",
    });
  }

  try {
    // check user already exits
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "User already exits",
      });
    }

    // save user in db

    const hashPassword = await bcrypt.hash(password, 10);
    // create user
    const user = new User({
      name,
      email,
      password: hashPassword,
      country,
    });
    await user.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//   -----------------------LOGIN----------------------------

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Fill email and password" });
  }
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // compari passworrd
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    // Return user data and token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
