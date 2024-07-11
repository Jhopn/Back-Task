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

export const stripeTask = async (req: Request, res: Response) => {
  try {
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

    if (task!) return res.status(404).json({ error: "Task não encontrada!" });

    return res.status(200).json({ message: "Task deletada!" });
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao deletar tarefa",
      message: error,
    });
  }
};
