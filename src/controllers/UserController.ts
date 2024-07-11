import { prisma } from "../connection/prisma";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, avatar } = req.body;

    const emailCheck = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailCheck)
      return res.status(403).json({ error: "Email já está sendo usado" });

    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        avatar,
      },
    });

    return res.status(200).json(createdUser);

    return res.status(200).json(createdUser);
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao criar Usuário",
      message: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, avatar } = req.body;
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao criar Usuário",
      message: error,
    });
  }
};

export const readUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isId = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (isId!) return res.status(404).json({ error: "Erro ao encontrar User" });

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        username: true,
        email: true,
        password: true,
        avatar: true,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao criar Usuário",
      message: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isId = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (isId!) return res.status(404).json({ error: "Erro ao encontrar User" });

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ deleteted: "Usuário deletado com sucesso" });
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao deletar Usuário",
      message: error,
    });
  }
};
