const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    jobs: [Job] 
  }

  type Job {
    id: ID!
    title: String!
    company: String!
    applications: [Application]
    description: String
    postedDate: String
    location: String
    salary: String
  }

  type Application {
    id: ID!
    job: Job!
    user: User!
    status: String!
    appliedDate: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    jobs: [Job]
    job(id: ID!): Job
    applications: [Application]
    application(id: ID!): Application
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    registerUser(email: String!, password: String!): AuthPayload
    createJob(title: String!, company: String!, description: String!, location: String, salary: String): Job
    applyForJob(userId: ID!, jobId: ID!): Application
    updateApplicationStatus(id: ID!, status: String!): Application
  }
`;

module.exports = typeDefs;