const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB();

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();
app.use(express.json());

// Allow requests from your frontend domain
app.use(
  cors({
    origin: "https://workwise-1-3yv0.onrender.com", // <-- your frontend URL
    credentials: true,
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded", // 🚀 Fix memory exhaustion warning
  persistedQueries: false, // Disabling unnecessary query caching
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 10000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(
      `⚡ GraphQL API available at https://workwise-4arc.onrender.com${server.graphqlPath}`
    );
  });
}

startServer();