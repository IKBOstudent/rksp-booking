import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '.';
import { Role } from '@prisma/client';
import { ITokenData } from './types';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.log('no JWT_SECRET env provided');
    process.exit(1);
}

export const createToken = (user: ITokenData) => {
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: '1d',
    });
};

interface AuthRequest extends Request {
    user?: {
        id: number;
        role: Role;
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
            id: number;
            role: Role;
        };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            console.log('somehow no user');
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error occured' });
    }
};

const roleMiddleware = (roles: Role[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

export { authMiddleware, roleMiddleware, AuthRequest };
