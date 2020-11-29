import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import schema from './schema';
import { createServer } from 'http';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import './passport';
import  authenticateJwt   from './passport';
import  isAuthenticated  from './middlewares';


// // 기본 스칼라 타입 : Int, Float, String, Boolean, ID
// // 객체 Type
// // Query, Mutation, Subscription, Input
// // interface, implements
// // Custom Scalar
// // enum
// // union, __resolveType
// // @deprecated, @skip, @include
// // 스키마 지시문 구현
// // @cacheControl
// const typeDefs = gql`
//   type Book {
//     "Description for argument"
//     title: String
//     """
//     Description for field
//     Supports **multi-line** description for your [API](http://example.com)!
//     """
//     author: String
//   }
//   type Query {
//     books: [Book]
//   }
// `;

// // parent, args, context, info
// // AuthenticationError, UserInputError, ApolloError
// // MockList
// // info.cacheControl.setCacheHint
// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

// NODE_ENV="production" 에서 서버가 배포된 경우 playground:true, introspection:true 해줘야됨.
// 사용자 정의 스키마 지시문 사용 : schemaDirectives
// 리졸버 성능 모니터링 : tracing: true
// REST Data Source : apollo-datasource-rest
// 리졸버에 데이터소스 액세스 권한 부여 : dataSources
// Cache DB로 Memcached, Redis 사용 지원 : apollo-server-cache-memcached, apollo-server-cache-redis
// formatError
// plugins : ApolloServerPluginUsageReporting
// mocks: true
// mockEntireSchema: false
// cacheControl: { defaultMaxAge: 5,}
// plugins: [responseCachePlugin()]

const pubsub = new PubSub();
const server: any = new ApolloServer({
  schema,
  context: ({ req: request }) => ({ request, isAuthenticated, pubsub }),
  tracing: true,
});

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(authenticateJwt);

server.applyMiddleware({ app, path: '/graphql'});

const httpServer = createServer(app);
const PORT = 2025;

server.installSubscriptionHandlers(httpServer)
httpServer.listen({ port: PORT }, () =>{
  console.log(`Server Start http://localhost:${PORT}/graphql`)
  console.log(server.subscriptionsPath)
});

// createTestClient
