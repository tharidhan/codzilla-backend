const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../models/userModel");

// Registration
exports.register = (req, res) => {
  const { name, email, password, birthday } = req.body;

  if (!name || !email || !password || !birthday) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  // Check if the email is already registered
  userModel.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: "Email already registered" });
      }

      // Hash the password
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          console.error("Error hashing password:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        // Insert user into the database
        userModel.query(
          "INSERT INTO users (name, email, password, birthday) VALUES (?, ?, ?, ?)",
          [name, email, hash, birthday],
          (error, results) => {
            if (error) {
              console.error("Error registering user:", error);
              return res.status(500).json({ message: "Internal server error" });
            }

            return res.status(201).json({ message: "Registration successful" });
          }
        );
      });
    }
  );
};

// // Login
// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ message: "Please provide email and password" });
//   }

//   // Check if the user with the provided email exists
//   userModel.query(
//     "SELECT * FROM users WHERE email = ?",
//     [email],
//     (error, results) => {
//       if (error) {
//         console.error("Error checking email:", error);
//         return res.status(500).json({ message: "Internal server error" });
//       }

//       if (results.length === 0) {
//         return res.status(401).json({ message: "Invalid credentials1" });
//       }

//       // Compare the provided password with the hashed password in the database
//       bcrypt.compare(password, results[0].password, (error, passwordMatch) => {
//         if (error) {
//           console.error("Error comparing passwords:", error);
//           return res.status(500).json({ message: "Internal server error" });
//         }

//         if (!passwordMatch) {
//           return res.status(401).json({ message: "Invalid credentials2" });
//         }

//         // Generate and return a JWT token
//         const token = jwt.sign({ userId: results[0].id }, config.jwtSecret, {
//           expiresIn: "1h",
//         });

//         // Send a success message along with the token
//         return res.status(200).json({ message: "Login successful", token });
//       });
//     }
//   );
// };

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  // Check if the user with the provided email exists
  userModel.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, results[0].password, (error, passwordMatch) => {
        if (error) {
          console.error("Error comparing passwords:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate and return a JWT token
        const token = jwt.sign({ userId: results[0].id }, config.jwtSecret, {
          expiresIn: "1h",
        });

        // Send a success message along with the token
        return res.status(200).json({ message: "Login successful", token });
      });
    }
  );
};
