const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    message: String!
    isLogin: Boolean!
  }

  type LoginUsers {
    isAuth: Boolean!
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
