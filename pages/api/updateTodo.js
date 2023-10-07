// pages/api/updateTodo.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === "PUT") {
    try {
      const { id, task, completed } = req.body;
      const updatedTodo = await prisma.todo.update({
        where: {
          id: Number(id),
        },
        data: {
          task,
          completed,
        },
      });
      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error("Error updating Todo:", error);
      res.status(500).json({ error: "Unable to update Todo" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
