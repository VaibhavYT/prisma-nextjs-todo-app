// pages/api/todos.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      // Implement your deletion logic here using Prisma
      const deletedTodo = await prisma.todo.delete({
        where: {
          id: Number(id),
        },
      });

      if (!deletedTodo) {
        // If the Todo item with the specified ID was not found, return a 404 error.
        res.status(404).json({ error: "Todo not found" });
      } else {
        // Successfully deleted the Todo item, respond with a 204 No Content status code.
        res.status(204).end();
      }
    } catch (error) {
      console.error("Error deleting Todo:", error);
      res.status(500).json({ error: "Unable to delete Todo" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
