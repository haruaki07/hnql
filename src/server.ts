import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "node:http";
import { config } from "./config";
import schema from "./graphql/schema";

interface MyContext {
  token?: string;
}

async function main() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.port }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${config.port}/`);
}

main().catch((e) => console.error(e));
