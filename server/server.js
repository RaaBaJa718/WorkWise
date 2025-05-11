const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
require("dotenv").config();

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