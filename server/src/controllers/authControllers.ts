import bcrypt from 'bcryptjs';
import { type Request, type Response } from 'express';
import { prisma } from '..';
import { createToken } from '../middlewares/authMiddleware';
import { IUser } from '../types';

export const signupController = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Bad request' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        const token = createToken({ id: newUser.id, role: newUser.role });
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        res.cookie('jwt', token, { expires });

        const user: IUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        };
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const signinController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = createToken({ id: user.id, role: user.role });
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        res.cookie('jwt', token, { expires });

        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error signing in' });
    }
};
