import gql from "graphql-tag";

export const AuthSchema = gql`
  input SignInInput {
    id: String!
    password: String!
  }

  input SignUpInput {
    id: String!
    password: String!
  }

  type Credentials {
    access_token: String!
  }

  extend type Query {
    me: User!
  }

  extend type Mutation {
    signIn(input: SignInInput!): Credentials!
    signUp(input: SignUpInput!): String!
  }
`;
