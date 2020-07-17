import fastify, { FastifyRequest } from 'fastify';
import { ApolloServer, IResolvers } from 'apollo-server-fastify';
import { ApolloServerBase, Context, Config } from 'apollo-server-core';
import { DocumentNode } from 'graphql';
import { Server } from 'http';

type CreateMiddlewareParams = {
  typeDefs: DocumentNode;
  resolvers: IResolvers;
  context: (request: any) => Context;
  graphqlConfig: Config;
};

type ListenParams = {
  port: string;
  host: string;
};

class RecifeFastify {
  app = fastify({ logger: true });

  constructor(bodyParser: any, cors: any, homepage: string) {
    // this.app.use(koaBody(bodyParser));

    // if (cors && cors.enabled) {
    //   this.app.use(koaCors(cors));
    // }

    this.app.get('/', (_, reply) => {
      reply.send(homepage);
    });
  }

  createApolloServer({
    typeDefs,
    resolvers,
    context,
    graphqlConfig
  }: CreateMiddlewareParams): ApolloServerBase {
    const apolloServer = new ApolloServer({
      ...graphqlConfig,
      resolvers,
      typeDefs,
      context: ({ request }: { request: FastifyRequest }) =>
        context({
          method: request.method,
          url: request.url,
          header: request.headers
        })
    });

    this.app.register(apolloServer.createHandler());

    return apolloServer;
  }

  listen({ port, host }: ListenParams, callback: () => void) {
    this.app.listen(parseInt(port), host, () => callback());

    return this.app;
  }
}

export default RecifeFastify;