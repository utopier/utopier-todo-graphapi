import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from'jsonwebtoken';
import bcrypt from'bcryptjs';

export default {
  Mutation: {
    signUp: async (_, args) => {
      console.log(args)
      const { name, email } = args;
      const exists = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      console.log(exists);
      if (exists) {
        throw Error('This username / email is already taken');
      }
      const password = await bcrypt.hash(args.password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      console.log(user)
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      return {
        token,
        user,
      };
    },
  },
};