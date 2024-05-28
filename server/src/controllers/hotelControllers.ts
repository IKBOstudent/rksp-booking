import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import { prisma } from '..';

export const getAllHotelsController = async (
    req: AuthRequest,
    res: Response,
) => {
    const owner = req.user?.id;

    if (!owner) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const hotels = await prisma.hotel.findMany({
            where: {
                owner,
            },
            include: {
                features: true,
                rooms: true,
            },
        });

        res.status(200).json({ hotels });
    } catch (error) {
        res.status(500).json({ error: 'failed to get hotels' });
    }
};

export const getHotelController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const hotel = await prisma.hotel.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                features: true,
                rooms: true,
                Region: true,
            },
        });

        res.status(200).json({ hotel });
    } catch (error) {
        res.status(500).json({ error: 'failed to get hotel' });
    }
};

export const createHotelController = async (
    req: AuthRequest,
    res: Response,
) => {
    const { name, regionId, images, rating, reviews } = req.body;

    const owner = req.user?.id;

    if (!owner) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const hotel = await prisma.hotel.create({
            data: {
                name,
                regionId,
                images,
                rating,
                reviews,
                owner,
            },
        });
        res.status(201).json({ hotel });
    } catch (error) {
        res.status(500).json({ error: 'failed to create hotel' });
    }
};

export const updateHotelController = async (
    req: AuthRequest,
    res: Response,
) => {
    const { id } = req.params;
    const { name, images, rating, reviews } = req.body;

    const owner = req.user?.id;

    if (!owner) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const hotel = await prisma.hotel.update({
            where: {
                id: parseInt(id, 10),
                owner,
            },
            data: {
                name,
                images,
                rating,
                reviews,
            },
        });

        if (!hotel) {
            return res.status(404).json({
                error: 'hotel does not exist',
            });
        }

        res.status(200).json({ hotel });
    } catch (error) {
        res.status(500).json({ error: 'failed to update hotel' });
    }
};

export const deleteHotelController = async (
    req: AuthRequest,
    res: Response,
) => {
    const { id } = req.params;

    const owner = req.user?.id;

    if (!owner) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const hotel = await prisma.hotel.delete({
            where: {
                id: parseInt(id, 10),
                owner,
            },
        });

        if (!hotel) {
            return res.status(404).json({
                error: 'hotel does not exist',
            });
        }

        res.status(200).json({ message: 'hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'failed to delete hotel' });
    }
};

export const createFeatureController = async (
    req: AuthRequest,
    res: Response,
) => {
    const { name, hotelId } = req.body;

    if (!name || !hotelId) {
        return res.status(400).json({ error: 'All parameters are required' });
    }

    const owner = req.user?.id;

    if (!owner) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        // TODO: only owner can create
        const feature = await prisma.feature.create({
            data: {
                name,
                hotelId,
            },
        });

        res.status(200).json({ feature });
    } catch (error) {
        res.status(500).json({ error: 'failed to create feature' });
    }
};

export const deleteFeatureController = async (
    req: AuthRequest,
    res: Response,
) => {
    const { id } = req.params;

    const owner = req.user?.id;

    if (!owner) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        // TODO: only owner can delete
        const feature = await prisma.feature.delete({
            where: { id: parseInt(id, 10) },
        });

        if (!feature) {
            return res.status(404).json({
                error: 'feature does not exist',
            });
        }

        res.status(200).json({ message: 'feature deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'failed to delete feature' });
    }
};
