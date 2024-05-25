import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from ".";
import { ERole } from "./constants";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface AuthRequest extends Request {
    user?: {
        id: number;
        role: ERole;
    };
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: ERole };

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = { id: decoded.userId, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const roleMiddleware = (roles: ERole[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};

export { authMiddleware, roleMiddleware, AuthRequest };
