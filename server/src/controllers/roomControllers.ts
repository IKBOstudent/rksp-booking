import { Response } from 'express';
import { AuthRequest } from '../types';
import { prisma } from '..';

export const bookHotelController = async (req: AuthRequest, res: Response) => {
    const { roomId, checkInDate, checkOutDate } = req.body;

    const userId = req.user?.id;

    if (!userId) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    if (!roomId || !checkInDate || !checkOutDate) {
        return res.status(400).json({ error: 'All parameters are required' });
    }

    try {
        const overlappingReservations = await prisma.reservation.findMany({
            where: {
                roomId,
                OR: [
                    {
                        checkInDate: {
                            lt: new Date(checkOutDate),
                        },
                    },
                    {
                        checkOutDate: {
                            gt: new Date(checkInDate),
                        },
                    },
                ],
            },
        });

        if (overlappingReservations.length > 0) {
            return res.status(409).json({
                message: 'Room is not available',
            });
        }

        const reservation = await prisma.reservation.create({
            data: {
                roomId,
                checkInDate,
                checkOutDate,
                userId,
            },
        });

        res.status(201).json({ reservation });
    } catch (error) {
        res.status(500).json({ error: 'failed to create reservation' });
    }
};

export const createRoomController = async (req: AuthRequest, res: Response) => {
    const { nightPrice, maximumGuestsCount, hotelId } = req.body;

    if (!nightPrice || !maximumGuestsCount || !hotelId) {
        return res.status(400).json({ error: 'All parameters are required' });
    }

    const owner = req.user?.id;

    if (!owner) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        // TODO: only owner can create
        const room = await prisma.room.create({
            data: {
                maximumGuestsCount,
                nightPrice,
                hotelId,
            },
        });

        res.status(201).json({ room });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create room' });
    }
};

export const deleteRoomController = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const owner = req.user?.id;

    if (!owner) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        // TODO: only owner can delete
        const room = await prisma.room.delete({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (!room) {
            return res.status(404).json({
                error: 'room does not exist',
            });
        }

        res.status(200).json({ message: 'room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete room' });
    }
};
