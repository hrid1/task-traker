const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./utils/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express();
// middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes)
app.use("/api/project", projectRoutes)
app.use("/api/task", taskRoutes )


app.get("/", (req, res) => {
  res.send("Hello word");
});

// start server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
