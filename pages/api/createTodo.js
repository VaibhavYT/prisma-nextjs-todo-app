import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if(req.method === "POST"){
        try {
            const {task,completed} = req.body;
            const todo = await prisma.todo.create({
                data : {
                    task,
                    completed,
                },
            });
            res.status(201).json(todo);
        } catch (error) {
            console.error("Error creating Todo: ",error);
            res.status(500).json({error : "Unable to create Todo"});
        }
        finally{
            await prisma.$disconnect();
        }
    }
    else{
        res.status(405).json({error : "Method not allowed"});
    }
};
