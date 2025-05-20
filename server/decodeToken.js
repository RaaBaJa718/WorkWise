require("dotenv").config(); // ✅ Load environment variables
const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  if (!token) {
    console.error("❌ No token provided!");
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // ✅ Securely verify token
  } catch (error) {
    console.error("❌ Invalid token!", error);
    return null; // Handle errors gracefully
  }
};

module.exports = decodeToken;