import 'reflect-metadata';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import * as dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { sayHello } from '@acme/utils';
dotenv.config();

import { MovieResolver } from './resolvers';

console.log(sayHello());

(async () => {
  const PORT = process.env.PORT || 8001;
  const app = express();
  const apoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MovieResolver],
      validate: true,
    }),
    playground: true,
  });

  apoloServer.applyMiddleware({
    app,
    cors: {
      origin: '*',
      optionsSuccessStatus: 200,
    },
  });

  const httpServer = http.createServer(app);

  apoloServer.installSubscriptionHandlers(httpServer);
  httpServer.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}${apoloServer.graphqlPath}`)
  );
})();
