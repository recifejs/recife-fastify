import fastify, { FastifyRequest } from 'fastify';
import { ApolloServer, IResolvers } from 'apollo-server-fastify';
import { ApolloServerBase, Context, Config } from 'apollo-server-core';
import { DocumentNode } from 'graphql';

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
          method: request.req.method,
          url: request.req.url,
          header: request.req.headers
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
