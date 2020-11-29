import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  User: {
    todo: ({ id }) => prisma.user.findUnique({ where: { id } }).todo(),
  },
};
