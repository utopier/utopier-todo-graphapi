import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    Subscription: {
        todoUpdated:  {
            subscribe: (_,__,{pubsub}) => pubsub.asyncIterator(["TODO_UPDATED"]),
        }
    }
}