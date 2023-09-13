// const userModel = require("../models/userModel");

// // Get user data
// exports.getUserData = (req, res) => {
//   // Implementation goes here
// };

const userModel = require("../models/userModel");

// Get user data
exports.getUserData = (req, res) => {
  const userId = req.userId; // User ID obtained from JWT token authentication

  userModel.query(
    "SELECT id, name, email, birthday, image FROM users WHERE id = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userData = results[0];
      return res.status(200).json(userData);
    }
  );
};
