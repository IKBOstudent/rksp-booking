import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '.';
import { Role } from '@prisma/client';
import { ITokenData } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const createToken = (user: ITokenData) => {
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: '1d',
    });
};

interface AuthRequest extends Request {
    user?: {
        id: number;
        role: $Enums.Role;
    };
}

const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: number;
            role: $Enums.Role;
        };

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = { id: decoded.userId, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const roleMiddleware = (roles: $Enums.Role[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

export { authMiddleware, roleMiddleware, AuthRequest };
