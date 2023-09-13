// const jwt = require("jsonwebtoken");
// const config = require("../config/config");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Authorization token not provided" });
//   }

//   try {
//     const decodedToken = jwt.verify(token, config.jwtSecret);
//     req.userId = decodedToken.userId;
//     next();
//   } catch (err) {
//     console.error("Error verifying token:", err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// const jwt = require("jsonwebtoken");
// const config = require("../config/config");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Authorization token not provided" });
//   }

//   try {
//     const decodedToken = jwt.verify(token, config.jwtSecret);
//     req.userId = decodedToken.userId;
//     next();
//   } catch (err) {
//     console.error("Error verifying token:", err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token not provided" });
  }

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    if (decodedToken) {
      req.userId = decodedToken.userId;
      req.loggedIn = true; // Add a loggedIn property to the request object
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
