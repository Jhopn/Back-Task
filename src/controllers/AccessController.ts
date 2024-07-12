import { prisma } from "../connection/prisma";
import  {Response, Request}  from "express";

const PROTECTED_ACCESSES = ['admin', 'usuario'];

export const createAccess = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const access = await prisma.access.create({
          data: {
            name,
          },
        });
        return res.status(201).json(access);
      } catch (error) {
        return res.status(400).json({
            error: "Erro ao criar acesso",
            message: error
        });
      }
}

export const stripeAccess = async (req: Request, res: Response) => {
    try {
        const access = await prisma.access.findMany({
          orderBy: {
            name: 'desc'
          },
          select: {
            id: true,
            name: true
          }
        });

        return res.status(201).json(access);
      } catch (error) {
        return res.status(400).json({
            error: "Erro ao criar acesso",
            message: error
        });
      }
}

export const updateAccess = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const isAccess = await prisma.access.findUnique({ where: { id } });

        if (!isAccess) {
          return res.status(404).json({ message: 'Acesso Inexistente!' });
        }
    
        if (PROTECTED_ACCESSES.includes(isAccess.name.toLowerCase())) {
          return res.status(403).json({ message: 'Não é possível modificar acessos protegidos.' });
        }
    
        const updatedAccess = await prisma.access.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });
    
        return res.status(200).json(updatedAccess);
      } catch (error) {
        return res.status(400).json({
            error: "Erro ao criar acesso",
            message: error
        });
      }
}


export const deleteAccess = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const accessToDelete = await prisma.access.findUnique({ where: { id } });
  
      if (!accessToDelete) {
        return res.status(404).json({ message: 'Acesso Inexistente!' });
      }
  
      if (PROTECTED_ACCESSES.includes(accessToDelete.name.toLowerCase())) {
        return res.status(403).json({ message: 'Não é possível excluir acessos protegidos.' });
      }
  
      await prisma.access.delete({ where: { id } });
  
      return res.status(200).json({ message: 'Acesso Deletado com Sucesso!' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao excluir acesso' });
    }
  };
  
