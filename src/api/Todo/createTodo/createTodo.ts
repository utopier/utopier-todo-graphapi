import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    createTodo: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { text } = args;
      await prisma.todo.create({
        data: {
          text,
          user: { connect: { id: +user.id } }
        },
      });
      return true;
    },
  },
};
