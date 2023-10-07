import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
export default async (req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if(req.method==="GET"){
        try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
        } catch (error) {
            console.error("Error fetching Todos: ",error);
            res.status(500).json({error:"Unable to fetch Todos"});
        }
        finally{
            await prisma.$disconnect();
        }
    }
    else{
        res.status(405).json({error: "Method not allowed"});
    }
} 
