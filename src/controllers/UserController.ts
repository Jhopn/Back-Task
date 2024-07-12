import { prisma } from "../connection/prisma";
import { randomInt } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Autenticação falhou, usuário não encontrado.',
      });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({
        message: 'Senha incorreta',
      });
    }

    return res.status(200).json({
      message: "Logado com sucesso"
});
  } catch (error) {
    return res.status(401).json({
      message: 'Falha de autenticação.',
      success: false,
    });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, avatar } = req.body;

    const emailCheck = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailCheck) {
      return res.status(403).json({ error: 'Email já está sendo usado' });
    } else {
      const ramdomSalt = randomInt(10, 16);
      bcrypt.hash(password, ramdomSalt).then(async (hash) => {

        const user = await prisma.user.create({
          data: {
            username,
            email,
            avatar,
            password: hash,    
          },
          select: {
            id: true,
            username: true,
            email: true,
          },
        });


        return res.status(201).json(user);
      });
    }

  } catch (error) {
    return res.status(400).json({
      error: "Erro ao criar Usuário",
      message: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password, avatar } = req.body;
    
    const isUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!isUser) {
      return res.status(404).json({error: "Usuário não encontrado"})
    } else {
      const ramdomSalt = randomInt(10, 16);
      bcrypt.hash(password, ramdomSalt).then(async (hash) => {
        const updatedUser = await prisma.user.update({
          where: {
            id
          },
          data: {
            username, 
            email, 
            password: hash, 
            avatar
          }
        })
    
        return res.status(200).json(updatedUser)
      })
    }
  
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

    if (!isId) return res.status(404).json({ error: "Erro ao encontrar User" });

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

    if (!isId) return res.status(404).json({ error: "Erro ao encontrar User" });

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
