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
    title: String @column
    time: Timestamp @column
    parent: Item @link
    poll: Item @link
    kids: [Item!]
    parts: [Item!]
    descendants: Int @column
    score: Int!
  }

  type ItemScore @entity {
    id: ID! @id
    by: ID! @column
    item: Item! @link
    time: Timestamp! @column
  }

  input SubmitItemInput {
    title: String!
    text: String!
    url: String
  }

  input SubmitCommentInput {
    text: String!
    parent: String!
  }

  extend type User {
    submissions: [Item!]
  }

  extend type Query {
    news(limit: Int): [Item!]!
  }

  extend type Mutation {
    submitItem(input: SubmitItemInput!): Item!
    submitComment(input: SubmitCommentInput!): Item!
    upvoteItem(itemId: ID!): Int!
    unvoteItem(itemId: ID!): Int!
  }
`;
