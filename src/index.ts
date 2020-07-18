import fastify, { FastifyRequest, FastifyInstance } from 'fastify';
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
  app: FastifyInstance;

  constructor(bodyParserConfig: any, corsConfig: any, homepage: string) {
    this.app = fastify({ logger: true });

    if (corsConfig && corsConfig.enabled) {
      this.app.register(
        require('fastify-cors'),
        this.corsTranslator(corsConfig)
      );
    }

    this.app.get('/', (_, reply) => {
      reply.send(homepage);
    });
  }

  private corsTranslator(corsConfig: any) {
    return {
      origin: corsConfig.origin,
      methods: corsConfig.allowMethods,
      allowedHeaders: corsConfig.allowHeaders,
      exposedHeaders: corsConfig.exposeHeaders,
      credentials: corsConfig.credentials,
      maxAge: corsConfig.maxAge
    };
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
