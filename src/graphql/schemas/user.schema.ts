import gql from "graphql-tag";

export const UserSchema = gql`
  type User @entity {
    id: ID! @id
    karma: Int! @column
    about: String @column
    email: String @column
    created: Timestamp! @column
  }

  extend type Query {
    user(id: ID!): User!
  }
`;
