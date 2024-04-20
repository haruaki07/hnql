import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "./src/graphql/schema.ts": {
        noPluck: true,
      },
    },
  ],
  require: "ts-node/register/transpile-only",
  generates: {
    "./src/generated/types.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
      config: {
        useIndexSignature: true,
        contextType: "@/graphql/context#Context",
      },
    },
  },
};
export default config;
