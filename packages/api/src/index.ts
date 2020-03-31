import 'reflect-metadata';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import * as dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
dotenv.config();

import { MovieResolver } from './resolvers';

import { sayHello } from '@acme/utils';

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

  console.log(sayHello());

  const httpServer = http.createServer(app);

  apoloServer.installSubscriptionHandlers(httpServer);
  httpServer.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}${apoloServer.graphqlPath}`)
  );
})();
