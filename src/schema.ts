import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const resolvers = {};
