import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getTodos: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.todo.findMany({
        where: {
          user: { id: +user.id },
        },
      });
    },
  },
};
