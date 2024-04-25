import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '@/graphql/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: Date | string | number; output: Date | string | number; }
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ChangePasswordInput = {
  new_password: Scalars['String']['input'];
  old_password: Scalars['String']['input'];
};

export type Credentials = {
  __typename?: 'Credentials';
  access_token: Scalars['String']['output'];
};

export type Item = {
  __typename?: 'Item';
  by: Scalars['ID']['output'];
  descendants?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  kids?: Maybe<Array<Item>>;
  parent?: Maybe<Item>;
  parts?: Maybe<Array<Item>>;
  poll?: Maybe<Item>;
  score: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  time?: Maybe<Scalars['Timestamp']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: ItemType;
  url?: Maybe<Scalars['String']['output']>;
};

export type ItemScore = {
  __typename?: 'ItemScore';
  by: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  item: Item;
  time: Scalars['Timestamp']['output'];
};

export enum ItemType {
  Comment = 'COMMENT',
  Poll = 'POLL',
  Pollopt = 'POLLOPT',
  Story = 'STORY'
}

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean']['output'];
  signIn: Credentials;
  signUp: Scalars['String']['output'];
  submitComment: Item;
  submitItem: Item;
  unvoteItem: Scalars['Int']['output'];
  updateProfile: User;
  upvoteItem: Scalars['Int']['output'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationSubmitCommentArgs = {
  input: SubmitCommentInput;
};


export type MutationSubmitItemArgs = {
  input: SubmitItemInput;
};


export type MutationUnvoteItemArgs = {
  itemId: Scalars['ID']['input'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpvoteItemArgs = {
  itemId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  news: Array<Item>;
  user: User;
};


export type QueryNewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type SignInInput = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SubmitCommentInput = {
  parent: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type SubmitItemInput = {
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  created: Scalars['Timestamp']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  karma: Scalars['Int']['output'];
  submissions?: Maybe<Array<Item>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AdditionalEntityFields: AdditionalEntityFields;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ChangePasswordInput: ChangePasswordInput;
  Credentials: ResolverTypeWrapper<Credentials>;
  Item: ResolverTypeWrapper<Item>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ItemScore: ResolverTypeWrapper<ItemScore>;
  ItemType: ItemType;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Query: ResolverTypeWrapper<{}>;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  SubmitCommentInput: SubmitCommentInput;
  SubmitItemInput: SubmitItemInput;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  UpdateProfileInput: UpdateProfileInput;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AdditionalEntityFields: AdditionalEntityFields;
  String: Scalars['String']['output'];
  ChangePasswordInput: ChangePasswordInput;
  Credentials: Credentials;
  Item: Item;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  ItemScore: ItemScore;
  Mutation: {};
  Boolean: Scalars['Boolean']['output'];
  Query: {};
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  SubmitCommentInput: SubmitCommentInput;
  SubmitItemInput: SubmitItemInput;
  Timestamp: Scalars['Timestamp']['output'];
  UpdateProfileInput: UpdateProfileInput;
  User: User;
}>;

export type AbstractEntityDirectiveArgs = {
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
  discriminatorField: Scalars['String']['input'];
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = Context, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = Context, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = Context, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
  embedded?: Maybe<Scalars['Boolean']['input']>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = Context, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = Context, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = Context, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = Context, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UnionDirectiveArgs = {
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
  discriminatorField?: Maybe<Scalars['String']['input']>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = Context, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CredentialsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Credentials'] = ResolversParentTypes['Credentials']> = ResolversObject<{
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  by?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  descendants?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kids?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  parts?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
  poll?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemScoreResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemScore'] = ResolversParentTypes['ItemScore']> = ResolversObject<{
  by?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  changePassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'input'>>;
  signIn?: Resolver<ResolversTypes['Credentials'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  signUp?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  submitComment?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationSubmitCommentArgs, 'input'>>;
  submitItem?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationSubmitItemArgs, 'input'>>;
  unvoteItem?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUnvoteItemArgs, 'itemId'>>;
  updateProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'input'>>;
  upvoteItem?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUpvoteItemArgs, 'itemId'>>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  news?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType, Partial<QueryNewsArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  karma?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  submissions?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Credentials?: CredentialsResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemScore?: ItemScoreResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
  union?: UnionDirectiveResolver<any, any, ContextType>;
}>;

import { ObjectId } from 'mongodb';
export type ItemDbObject = {
  by: string,
  descendants?: Maybe<number>,
  _id: ObjectId,
  parent?: Maybe<ItemDbObject['_id']>,
  poll?: Maybe<ItemDbObject['_id']>,
  text: string,
  time?: Maybe<Date | string | number>,
  title?: Maybe<string>,
  type: string,
  url?: Maybe<string>,
};

export type ItemScoreDbObject = {
  by: string,
  _id: ObjectId,
  item: ItemDbObject['_id'],
  time: Date | string | number,
};

export type UserDbObject = {
  about?: Maybe<string>,
  created: Date | string | number,
  email?: Maybe<string>,
  _id: string,
  karma: number,
  password: string,
};
