const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const config = require("./config/config");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: config.jwtSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// File Upload Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define a GET endpoint
// Define a GET endpoint
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello, this is a simple API!" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/user", upload.single("image"), userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
