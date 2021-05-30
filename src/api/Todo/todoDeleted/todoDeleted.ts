import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    Subscription: {
        todoDeleted:  {
            subscribe: (_,__,{pubsub}) => pubsub.asyncIterator(["TODO_DELETED"]),
        }
    }
}