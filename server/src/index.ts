import express from 'express';
import cookieParser from 'cookie-parser';
import { Role, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import {
    authMiddleware,
    roleMiddleware,
    AuthRequest,
    createToken,
} from './authMiddleware';
import { IUser } from './types';
import { seed } from './seed';

export const prisma = new PrismaClient();
seed();

const app = express();
app.use(
    cors({
        origin: ['http://front', 'http://localhost:3000'],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.all('*', (req, _, next) => {
    console.log(req.method, decodeURI(req.url), 'from:', req.headers.host);
    next();
});

app.post('/api/signup', async (req, res) => {
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

app.post('/api/signin', async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ error: 'Error signing in' });
    }
});

app.get(
    '/api/users',
    authMiddleware,
    roleMiddleware([Role.ADMIN]),
    async (_, res) => {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json({ users: users });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    },
);

app.delete(
    '/api/user/:id',
    authMiddleware,
    roleMiddleware([Role.ADMIN]),
    async (req, res) => {
        const { id } = req.params;
        try {
            const users = await prisma.user.delete({
                where: { role: { not: Role.ADMIN }, id: parseInt(id, 10) },
            });
            res.status(200).json({ users: users });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    },
);

app.get('/api/profile', authMiddleware, async (req: AuthRequest, res) => {
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
});

app.get('/api/search_hotels', async (req, res) => {
    const { region, checkInDate, checkOutDate, guestCount } = req.query;

    if (!region || !checkInDate || !checkOutDate || !guestCount) {
        return res
            .status(400)
            .json({ error: 'All search parameters are required' });
    }

    try {
        const hotels = await prisma.hotel.findMany({
            where: {
                region: region.toString(),
                availableRoomsCount: {
                    gte: parseInt(guestCount.toString(), 10),
                },
                reservations: {
                    every: {
                        OR: [
                            {
                                checkInDate: {
                                    gt: new Date(checkOutDate.toString()),
                                },
                            },
                            {
                                checkOutDate: {
                                    lt: new Date(checkInDate.toString()),
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

const hotelEditRole = [Role.ADMIN, Role.PARTNER];

app.post(
    '/api/hotel',
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

        const owner = req.user?.id;

        if (!owner) {
            return res.status(403).json({ message: 'Forbidden' });
        }

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
                    owner,
                },
            });
            res.status(201).json(hotel);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create hotel' });
        }
    },
);

app.put(
    '/api/hotel/:id',
    authMiddleware,
    roleMiddleware(hotelEditRole),
    async (req: AuthRequest, res) => {
        const { id } = req.params;
        const data = req.body;

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
                data,
            });

            if (!hotel) {
                return res.status(404).json({
                    error: 'hotel does not exist',
                });
            }

            res.status(200).json(hotel);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update hotel' });
        }
    },
);

app.delete(
    '/api/hotel/:id',
    authMiddleware,
    roleMiddleware(hotelEditRole),
    async (req: AuthRequest, res) => {
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

            res.status(200).json({ message: 'Hotel deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete hotel' });
        }
    },
);

app.get(
    '/api/hotels',
    authMiddleware,
    roleMiddleware(hotelEditRole),
    async (req: AuthRequest, res) => {
        try {
            let hotels;

            const owner = req.user?.id;

            if (!owner) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            if (req.user?.role === Role.ADMIN) {
                hotels = await prisma.hotel.findMany();
            } else {
                hotels = await prisma.hotel.findMany({
                    where: {
                        owner,
                    },
                });
            }
            res.status(200).json(hotels);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch hotels' });
        }
    },
);

app.post('/api/book', authMiddleware, async (req: AuthRequest, res) => {
    const { hotelId, checkInDate, checkOutDate, guestsCount } = req.body;

    const userId = req.user?.id;

    if (!userId) {
        return res.status(403).json({ message: 'Forbidden' });
    }

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
                userId,
            },
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reservation' });
    }
});

app.get('/suggest_hotels', async (req, res) => {
    const { input } = req.query;

    try {
        const condition = {
            name: {
                contains: input?.toString().trim(),
                mode: 'insensitive',
            },
        };

        const suggestions = await prisma.region.findMany({
            where: input ? condition : undefined,
            select: {
                id: true,
                name: true,
            },
            take: 5,
        });

        res.status(200).json({ suggestions });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process suggestions' });
    }
});

const PORT = process.env.PORT;

if (!PORT) {
    console.log('no PORT env provided');
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
