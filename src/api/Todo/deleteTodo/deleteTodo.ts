import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteTodo: async (_, args, { request, isAuthenticated, pubsub }) => {
      isAuthenticated(request);
      const { user } = request;
      const { todoId, username } = args;
      try {
        if (user.name === username) {
          await prisma.todo.delete({ where: { id: +todoId } });
          pubsub.publish("TODO_DELETED", { todoDeleted: {id: todoId }});
      
          return true;
        } else {
          console.error('삭제할 권한이 없음');
          return false;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
