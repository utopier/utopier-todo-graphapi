import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await prisma.user.findOne({ where: { email } });
      console.log(user);
      if (!user) {
        throw new Error('No such user found');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      return {
        token,
        user,
      };
    },
  },
};
