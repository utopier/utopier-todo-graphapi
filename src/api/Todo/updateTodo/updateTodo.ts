import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    updateTodo: async (_, args, { request, isAuthenticated , pubsub}) => {
      isAuthenticated(request);
      const { todoId, username, text, done } = args;
      const { user } = request;
      try {
        if (username === user.name) {
          const updatedTodo =  await prisma.todo.update({
            where: { id: +todoId },
            data: {
              text,
              done,
            },
          });
          console.log(updatedTodo);
          pubsub.publish("TODO_UPDATED", { todoUpdated: {id:todoId, text, done, createdAt: updatedTodo.createdAt }});
          return true;
        } else {
          console.log('수정할 권한이 없음');
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
