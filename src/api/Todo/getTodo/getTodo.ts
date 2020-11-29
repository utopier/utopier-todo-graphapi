import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getTodo: async (_, args) => {
      const { todoId } = args;
      return await prisma.todo.findUnique({
        where: {
          id: +todoId,
        },
      });
    },
  },
};
