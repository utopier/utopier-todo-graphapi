import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Todo: {
    user: ({ id }) => prisma.todo.findUnique({ where: { id } }).user(),
  },
};
