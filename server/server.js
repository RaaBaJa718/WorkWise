const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
require("dotenv").config({ path: "../.env" });


const mongoose = require("mongoose");

async function testDB() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect("mongodb://localhost:27017/workwise", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Successfully Connected to MongoDB!");
    const users = await mongoose.connection.db.collection("users").find().toArray();
    console.log("✅ Retrieved Users:", users);
  } catch (error) {
    console.error("❌ Connection Failed:", error);
  }
}

testDB();

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