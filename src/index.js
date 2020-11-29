const { ApolloServer, gql } = require('apollo-server');

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// 기본 스칼라 타입 : Int, Float, String, Boolean, ID
// 객체 Type
// Query, Mutation, Subscription, Input
// interface, implements
// Custom Scalar
// enum
// union, __resolveType
// @deprecated, @skip, @include
// 스키마 지시문 구현
// @cacheControl
const typeDefs = gql`
  type Book {
    "Description for argument"
    title: String
    """
    Description for field
    Supports **multi-line** description for your [API](http://example.com)!
    """
    author: String
  }
  type Query {
    books: [Book]
  }
`;

// parent, args, context, info
// AuthenticationError, UserInputError, ApolloError
// MockList
// info.cacheControl.setCacheHint
const resolvers = {
  Query: {
    books: () => books,
  },
};

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
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// createTestClient
