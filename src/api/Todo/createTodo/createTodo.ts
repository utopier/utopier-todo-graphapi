import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    createTodo: async (_, args, { request, isAuthenticated, pubsub }) => {
      isAuthenticated(request);
      const { user } = request;
      const { text } = args;
      await prisma.todo.create({
        data: {
          text,
          user: { connect: { id: +user.id } }
        },
      });
      pubsub.publish("TODO_ADDED", { todoAdded: {text: args.text, done: false }});
      return true;
    },
  },
};
