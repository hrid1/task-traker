const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { singup, login } = require("../controllers/auth");

// signup
router.post("/signup", singup);
router.post("/login", login);

module.exports = router