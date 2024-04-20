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

  extend type User {
    submissions: [Item!]!
  }
`;
