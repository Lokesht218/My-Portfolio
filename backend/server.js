const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected Successfully");
})
.catch((err) => {
  console.log("MongoDB Error:", err);
});

// Routes
app.use("/api/contact", require("./routes/contactRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully....");
});

// Port
const PORT = process.env.PORT || 5000;

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});