import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const hello ={
    Query: {
        hello: (parent, args, context, infdo)=> {
            console.log(parent)
            return 'hello'
        }
    }
}

module.exports = hello;