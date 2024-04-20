"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const node_http_1 = __importDefault(require("node:http"));
const schema_1 = require("./schema");
const config_1 = require("./config");
async function main() {
    const app = (0, express_1.default)();
    const httpServer = node_http_1.default.createServer(app);
    // Same ApolloServer initialization as before, plus the drain plugin
    // for our httpServer.
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: schema_1.resolvers,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    // Ensure we wait for our server to start
    await server.start();
    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    app.use("/", (0, cors_1.default)(), express_1.default.json(), 
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }));
    // Modified server startup
    await new Promise((resolve) => httpServer.listen({ port: config_1.config.port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${config_1.config.port}/`);
}
main().catch((e) => console.error(e));
