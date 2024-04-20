import gql from "graphql-tag";

export const UserSchema = gql`
  type User @entity(additionalFields: [{ path: "password", type: "string" }]) {
    id: ID! @column(overrideType: "string") @map(path: "_id")
    karma: Int! @column
    about: String @column
    email: String @column
    created: Timestamp! @column
  }

  input UpdateProfileInput {
    about: String
    email: String
  }

  input ChangePasswordInput {
    old_password: String!
    new_password: String!
  }

  extend type Query {
    user(id: ID!): User!
  }

  extend type Mutation {
    updateProfile(input: UpdateProfileInput!): User!
    changePassword(input: ChangePasswordInput!): Boolean!
  }
`;
