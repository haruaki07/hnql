import gql from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { UserSchema } from "./schemas/user.schema";
import { UserResolvers } from "./resolvers/user.resolver";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import TimestampType from "./scalars/timestamp";

const BaseSchema = gql`
  type Query

  scalar Timestamp
`;

const BaseResolver = { Timestamp: TimestampType };

export default makeExecutableSchema({
  typeDefs: [DIRECTIVES, BaseSchema, UserSchema],
  resolvers: [BaseResolver, UserResolvers],
});
