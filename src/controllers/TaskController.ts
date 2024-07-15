import { TaskStatus } from "@prisma/client";
import { prisma } from "../connection/prisma";
import { Request, Response } from "express";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, userId } = req.body;
    const taskCreated = await prisma.tasks.create({
      data: {
        title,
        description,
        dueDate,
        userId,
      },
    });

    const isUser = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })

    if(!isUser) return res.status(404).json({ error: "Usuário inexistente"})
    return res.status(201).json(taskCreated);
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao criar tarefa",
      message: error,
    });
  }
};

export const readTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isTask = await prisma.tasks.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        description: true,
        dueDate: true,
        status: true,
        userId: true,
      },
    });

    if (!isTask)
      return res.status(404).json({ error: "Tarefa não encontrada" });

    return res.status(200).json(isTask);
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao listar tarefa",
      message: error,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, userId } = req.body;
    const isTask = await prisma.tasks.findUnique({
      where: {
        id,
      },
    });

    if (!isTask)
      return res.status(404).json({ error: "Tarefa não encontrada" });

    const updatedTask = await prisma.tasks.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        dueDate,
        userId,
      },
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao Atualizar tarefa",
      message: error,
    });
  }
};

export const updateStatusTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isTask = await prisma.tasks.findUnique({
      where: {
        id,
      },
    });

    if (!isTask)
      return res.status(404).json({ error: "Tarefa não encontrada" });

    const oldStatus = await prisma.tasks.findUnique({
      where:{
        id,
      },
      select:{
        status: true
      }
    })

    let newStatus;
    if (oldStatus?.status === TaskStatus.INCOMPLETO) {
      newStatus = TaskStatus.COMPLETO;
    } else {
      newStatus = TaskStatus.INCOMPLETO;
    }

    const updatedTask = await prisma.tasks.update({
      where: {
        id,
      },
      data: {
        status: newStatus,
      },
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao Atualizar status da tarefa",
      message: error,
    });
  }
};

export const stripeTask = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const tasks = await prisma.tasks.findMany({
      where:{
        userId: userId
      },
      select: {
        id: true, 
        title: true,
        description: true,
        dueDate: true,
        status: true
      }
    })

    if(!tasks) return res.status(404).json({error: "Nenhuma tarefa encontrada"})
    
    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao listar tarefas",
      message: error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await prisma.tasks.findUnique({
      where: {
        id: id,
      },
    });

    if (!task) return res.status(404).json({ error: "Task não encontrada!" });

    await prisma.tasks.delete({
      where: {
        id
      }
    })
    return res.status(200).json({ message: "Task deletada!" });
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao deletar tarefa",
      message: error,
    });
  }
};
