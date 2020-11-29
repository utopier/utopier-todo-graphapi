import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    Subscription: {
        todoAdded:  {
            subscribe: (_,__,{pubsub}) => pubsub.asyncIterator(["TODO_ADDED"]),
        }
    }
}