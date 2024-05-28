import { Request, Response } from 'express';
import { prisma } from '..';

export const searchController = async (req: Request, res: Response) => {
    const { regionId, checkInDate, checkOutDate, guestsCount } = req.query;

    if (!regionId || !checkInDate || !checkOutDate || !guestsCount) {
        return res
            .status(400)
            .json({ error: 'All search parameters are required' });
    }

    try {
        const groupRooms = await prisma.room.groupBy({
            by: ['hotelId'],
            where: {
                Hotel: {
                    regionId: parseInt(regionId.toString(), 10),
                },
                maximumGuestsCount: {
                    lte: parseInt(guestsCount.toString(), 10),
                },
                reservations: {
                    every: {
                        OR: [
                            {
                                checkInDate: {
                                    gte: new Date(checkOutDate.toString()),
                                },
                            },
                            {
                                checkOutDate: {
                                    lte: new Date(checkInDate.toString()),
                                },
                            },
                        ],
                    },
                },
            },
        });

        const hotels = await prisma.hotel.findMany({
            where: {
                id: {
                    in: groupRooms.map((val) => val.hotelId),
                },
            },
        });

        res.status(200).json({ hotels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching for hotels' });
    }
};

export const suggestController = async (req: Request, res: Response) => {
    const { input } = req.query;

    try {
        let suggestions;

        if (!input) {
            suggestions = await prisma.region.findMany({
                select: {
                    id: true,
                    name: true,
                },
                take: 5,
            });
        } else {
            suggestions = await prisma.region.findMany({
                where: {
                    name: {
                        startsWith: input.toString().trim(),
                        mode: 'insensitive',
                    },
                },
                select: {
                    id: true,
                    name: true,
                },
                take: 5,
            });
        }

        res.status(200).json({ suggestions });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process suggestions' });
    }
};
