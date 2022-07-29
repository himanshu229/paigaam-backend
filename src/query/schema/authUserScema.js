const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    createdAt: String!
    updatedAt: String!
  }

  type LoginUsers {
    _id: ID!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    createdAt: String!
    updatedAt: String!
    token: String!
  }

  input LoginUser {
    phoneNumber: String
    password: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    phoneNumber: String!
    password: String!
    confirmPassword: String!
  }

  type Mutation {
    createUser(user: UserInput): User!
    loginUser(user: LoginUser): LoginUsers!
  }
`;
