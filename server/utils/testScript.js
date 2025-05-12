const bcrypt = require("bcrypt");

(async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);
  console.log("🔑 Hashed Password:", hashedPassword);
})();