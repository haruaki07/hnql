import gql from "graphql-tag";

export const ItemSchema = gql`
  enum ItemType {
    STORY
    COMMENT
    POLL
    POLLOPT
  }

  type Item @entity(embedded: true) {
    id: ID! @id
    by: ID! @column
    type: ItemType! @column
    text: String! @column
    url: String @column
    title: String! @column
    time: Timestamp @column
    parent: Item @link
    poll: Item @link
    kids: [Item!]
    parts: [Item!]
    descendants: Int @column
  }

  input SubmitItemInput {
    title: String!
    text: String!
    url: String
  }

  extend type User {
    submissions: [Item!]
  }

  extend type Mutation {
    submitItem(input: SubmitItemInput!): Item!
  }
`;
