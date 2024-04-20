import "reflect-metadata/lite";
import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "node:http";
import { config } from "./config";
import { Context } from "./graphql/context";
import schema from "./graphql/schema";
import container from "./container";
import { TYPES } from "./container/types";

async function main() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const context = container.get<Context>(TYPES.Context);

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return { ...context };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.port }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${config.port}/`);
}

main().catch((e) => console.error(e));
