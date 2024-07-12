import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../connection/prisma.js';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken extends JwtPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  userData?: { id: string };
}

export function authAccess(permissions?: string[]) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ msg: 'Autenticação falhou, reveja seu token!' });
      }

      const token = authHeader.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
      req.userData = { id: decodedToken.userId };

      if (permissions) {
        const user = await prisma.user.findUnique({
          where: {
            id: decodedToken.userId,
          },
          include: {
            UserAccess: {
              select: {
                Access: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });

        if (!user) {
          return res.status(403).json({ message: 'Usuário não encontrado.' });
        }

        const userPermissions = user.UserAccess.map((na) => na.Access?.name) ?? [];
        const hasPermission = permissions.some((p) => userPermissions.includes(p));

        if (!hasPermission) {
          return res.status(403).json({ message: 'Permissão negada.' });
        }
      }
      return next();
    } catch (error) {
      return res.status(401).json({ msg: 'Autenticação falhou, reveja seu token!' });
    }
  };
}
