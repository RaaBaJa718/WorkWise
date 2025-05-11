const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/workwise", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB Connected Successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err);
});

module.exports = mongoose;