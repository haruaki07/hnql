import { Resolvers } from "@/generated/types";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import { AuthResolver } from "./resolvers/auth.resolver";
import { UserResolvers } from "./resolvers/user.resolver";
import TimestampType from "./scalars/timestamp";
import { AuthSchema } from "./schemas/auth.schema";
import { ItemSchema } from "./schemas/item.schema";
import { UserSchema } from "./schemas/user.schema";

const BaseSchema = gql`
  type Query
  type Mutation

  scalar Timestamp
`;

const BaseResolver: Resolvers = { Timestamp: TimestampType };

export default makeExecutableSchema({
  typeDefs: [DIRECTIVES, BaseSchema, AuthSchema, UserSchema, ItemSchema],
  resolvers: [BaseResolver, AuthResolver, UserResolvers],
});
