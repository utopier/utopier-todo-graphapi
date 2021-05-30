import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    createTodo: async (_, args, { request, isAuthenticated, pubsub }) => {
      isAuthenticated(request);
      const { user } = request;
      const { text } = args;
      const newTodo = await prisma.todo.create({
        data: {
          text,
          user: { connect: { id: +user.id } }
        },
      });
      pubsub.publish("TODO_ADDED", { todoAdded: {id: newTodo.id,createdAt: newTodo.createdAt ,text: args.text, done: false }});
      return true;
    },
  },
};
