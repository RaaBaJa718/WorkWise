const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/workwise", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
  await User.create([
    { name: "Alice Johnson", email: "alice@example.com", password: "password123" },
    { name: "Bob Smith", email: "bob@example.com", password: "password123" },
  ]);

  console.log("✅ Users seeded successfully!");
  mongoose.connection.close();
};

seedUsers();