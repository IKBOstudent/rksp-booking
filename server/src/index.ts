import express from 'express';
import cookieParser from 'cookie-parser';
import { $Enums, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import {
    authMiddleware,
    roleMiddleware,
    AuthRequest,
    createToken,
} from './authMiddleware';
import { IUser } from './types';

export const prisma = new PrismaClient();

const app = express();
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.post('/signup', async (req, res) => {
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
        res.status(201).json({
            message: 'User created successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

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
        message: 'Signed in successfully',
        user: { id: user.id, name: user.name, role: user.role },
    });
});

app.get('/users', authMiddleware, roleMiddleware(['ADMIN']), async (_, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
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
        res.status(500).json({ error: 'Error retrieving user profile' });
    }
});

app.get('/search_hotels', async (req, res) => {
    const { region, checkInDate, checkOutDate, guestCount } = req.query;

    if (!region || !checkInDate || !checkOutDate || !guestCount) {
        return res
            .status(400)
            .json({ error: 'All search parameters are required' });
    }

    try {
        const hotels = await prisma.hotel.findMany({
            where: {
                region: region as string,
                availableRoomsCount: {
                    gte: parseInt(guestCount as string),
                },
                reservations: {
                    every: {
                        OR: [
                            {
                                checkInDate: {
                                    gt: new Date(checkOutDate as string),
                                },
                            },
                            {
                                checkOutDate: {
                                    lt: new Date(checkInDate as string),
                                },
                            },
                        ],
                    },
                },
            },
            include: {
                reservations: true,
            },
        });

        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching for hotels' });
    }
});

const hotelEditRole = [$Enums.Role.ADMIN, $Enums.Role.PARTNER];

app.post(
    '/hotel',
    authMiddleware,
    roleMiddleware(hotelEditRole),
    async (req: AuthRequest, res) => {
        const {
            name,
            region,
            imageUrl,
            rating,
            reviews,
            features,
            availableRoomsCount,
        } = req.body;

        try {
            const hotel = await prisma.hotel.create({
                data: {
                    name,
                    region,
                    imageUrl,
                    rating,
                    reviews,
                    features,
                    availableRoomsCount,
                    owner: req.user!.id,
                },
            });
            res.status(201).json(hotel);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create hotel' });
        }
    },
);

app.put(
    '/hotel/:id',
    authMiddleware,
    roleMiddleware(hotelEditRole),
    async (req: AuthRequest, res) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const hotel = await prisma.hotel.updateMany({
                where: {
                    id: parseInt(id, 10),
                    owner: req.user!.id,
                },
                data,
            });

            if (hotel.count === 0) {
                return res.status(403).json({
                    error: 'You do not have permission to update this hotel or hotel does not exist',
                });
            }

            res.status(200).json(hotel);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update hotel' });
        }
    },
);

app.delete(
    '/hotel/:id',
    authMiddleware,
    roleMiddleware(hotelEditRole),
    async (req: AuthRequest, res) => {
        const { id } = req.params;

        try {
            const hotel = await prisma.hotel.deleteMany({
                where: {
                    id: parseInt(id, 10),
                    owner: req.user!.id,
                },
            });

            if (hotel.count === 0) {
                return res.status(403).json({
                    error: 'You do not have permission to delete this hotel or hotel does not exist',
                });
            }

            res.status(200).json({ message: 'Hotel deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete hotel' });
        }
    },
);

app.get(
    '/hotels',
    authMiddleware,
    roleMiddleware(hotelEditRole),
    async (req: AuthRequest, res) => {
        try {
            let hotels;
            if (req.user?.role === $Enums.Role.ADMIN) {
                hotels = await prisma.hotel.findMany();
            } else {
                hotels = await prisma.hotel.findMany({
                    where: {
                        owner: req.user!.id,
                    },
                });
            }
            res.status(200).json(hotels);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch hotels' });
        }
    },
);

app.post('/book', authMiddleware, async (req: AuthRequest, res) => {
    const { hotelId, checkInDate, checkOutDate, guestsCount } = req.body;

    try {
        const overlappingReservations = await prisma.reservation.findMany({
            where: {
                hotelId,
                OR: [
                    {
                        checkInDate: {
                            lt: checkOutDate,
                        },
                        checkOutDate: {
                            gt: checkInDate,
                        },
                    },
                ],
            },
        });

        if (overlappingReservations.length > 0) {
            return res.status(409).json({
                message: 'No rooms available for the selected dates.',
            });
        }

        const reservation = await prisma.reservation.create({
            data: {
                hotelId,
                checkInDate,
                checkOutDate,
                guestsCount,
                userId: req.user!.id,
            },
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reservation' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
