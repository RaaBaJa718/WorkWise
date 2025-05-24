const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Remove useNewUrlParser and useUnifiedTopology if using MongoDB v4+
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB();

const typeDefs = require("./graphql/schema"); // Import GraphQL schema
const resolvers = require("./graphql/resolvers"); // Import resolvers

const app = express();
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`⚡ GraphQL API available at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();