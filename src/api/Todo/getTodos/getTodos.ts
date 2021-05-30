import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getTodos: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log(user.id)
      console.log(args.filter)
      const where = args.filter ? (
        {
          OR: [
            {user: {id: +user.id}},
            {text: args.filter}
          ]
        }
      ) : (
        {
          user:{
            id: +user.id
          }
        }
      );
      
      const count = await prisma.todo.count({where})

      const todos = await prisma.todo.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy,
      });

      return {
        todos,
        count,
      }
    },
  },
};
