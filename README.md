# utopier todoapp graphapi

- ApolloServer
- Prisma

---

# ApolloServer

## 1. Schema 정의

1. Basic Schema
   - 지원되는 유형
     - 스칼라 : Int, Float, String, Boolean, ID
       - 객체
       - Query
       - Mutation
       - Input
     - Apollo Studio 활용
     - 마크 다운 문서 문자열 지원
       - """... """
       - "..."
     - 네이밍 규칙
2. Cusotm scalars and enums
   - 사용자 지정 스칼라
   - 열거형
     - enum
3. Unions and interfaces
   - union
   - interface, implements
4. directives schema
   - 기본 지시어 : @deprecated, @skip, @include
   - 사용자 정의 스키마 지시문 사용
5. directives 구현
   - 스키마 지시문 구현
   - 스키마 지시문 선언

## 2. Data Fetching

1. Resolvers
2. Data sources
3. Error handling
4. File uploads
5. Subscriptions

## 3. Testing

1. Mocking
2. Integration testing
3. Apollo Studio Explorer
4. GraphQL Playground

## 4. Performance

1. Caching
2. Automatic persisted queries

## 5. Security

1. Authentication
2. Terminating SSL

## 6. Integrations

1. Node.js Middleware
2. Plugins

## 7. Deployment

1. Lambda

## 8. Monitoring

1. Metrics and logging
2. Health chaks

---

# Prisma

## 0. Prisma Setting

1. 프로젝트 설정
   - npm init -y
   - npm i -D @prisma/cli typescript ts-node @types/node
   - tsconfig.json 설정
   - npx prisma init
2. 데이터베이스 연결
   - prisma/schema.prisma
     ```prisma
     datasource db {
         provider = "mysql"
         url      = env("DATABASE_URL")
     }
     ```
   - prisma/.env
     ```env
     DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
     ```
3. SQL로 데이터베이스 테이블 만들기

   - shcema.sql

     ```sql
     CREATE TABLE User (
        id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255)
     );
     CREATE TABLE Todo (
        id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT now(),
        text TEXT,
        done BOOLEAN NOT NULL DEFAULT false,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(id)
     );

     ```

     - mysql 클라이언트에서 테이블 생성

4. Prisma로 데이터베이스 검사
   - npx prisma introspect
5. Prisma 클라이언트 설치 및 생성
    - npm install @prisma/client
    - npx prisma generate
    - npx ts-node index.ts