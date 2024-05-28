import { Request, Response } from 'express';
import { prisma } from '..';
import { Role } from '@prisma/client';
import { AuthRequest } from '../types';

export const getUsers = async (_: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({
            where: { role: { not: Role.ADMIN }, id: parseInt(id, 10) },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'user deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete users' });
    }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user data' });
    }
};
