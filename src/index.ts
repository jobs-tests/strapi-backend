import { ApolloServer, gql } from 'apollo-server-koa';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import Koa from 'koa';
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from 'koa-bodyparser';
import http from 'http';
import { DocumentNode } from 'graphql';
import { typeDefs } from './schema';
import { Query, Flight, Planet, SpaceCenter } from './resolvers'
import { create } from './service/knex';
import { Knex } from 'knex';



async function startApolloServer(typeDefs: DocumentNode, resolvers: any, knex: Knex) {
    const httpServer = http.createServer();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ knex: knex }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

    });

    await server.start();
    const app = new Koa();
    server.applyMiddleware({ app });
    httpServer.on('request', app.callback());
    await new Promise<void>(resolve => httpServer.listen({ port: 3000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
    return { server, app };
}





// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query,
    SpaceCenter,
    Planet
};

(async () => {
    const knex: Knex = await create();
    const { app, server } = await startApolloServer(typeDefs, resolvers, knex)

    const router = new Router();

    router.get("/", async (ctx, next) => {
        ctx.body = { msg: "Hello world!" };
        await next();
    })

    router.post("/", async (ctx, next) => {
        const data = ctx.request.body;
        ctx.body = data;
        await next();
    })

    app.use(json());
    app.use(logger());
    app.use(bodyParser());

    app.use(router.routes()).use(router.allowedMethods());

    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err: any) {
            // will only respond with JSON
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                message: err.message
            };
        }
    })

    //  app.listen(3000, () => {
    //    console.log("Koa started");
    // })

    app.on('error', err => {
        console.error('server error', err)
    });
})();
