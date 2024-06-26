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
    kids(limit: Int): [Item!]
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

  input PollOptInput {
    text: String!
  }

  input SubmitPollInput {
    title: String!
    text: String!
    url: String
    opts: [PollOptInput!]!
  }

  extend type User {
    submissions: [Item!]
  }

  extend type Query {
    item(id: String!): Item!
    news(limit: Int): [Item!]!
  }

  extend type Mutation {
    submitItem(input: SubmitItemInput!): Item!
    submitComment(input: SubmitCommentInput!): Item!
    submitPoll(input: SubmitPollInput!): Item!
    upvoteItem(itemId: ID!): Int!
    unvoteItem(itemId: ID!): Int!
  }
`;
