import express from 'express';
import cookieParser from 'cookie-parser';
import { Role, PrismaClient } from '@prisma/client';
import cors from 'cors';
import { authMiddleware, roleMiddleware } from './middlewares/authMiddleware';
import { seedAdmin, seedRegions } from './seeds/seed';
import {
    signinController,
    signupController,
} from './controllers/authControllers';
import {
    deleteUser,
    getProfile,
    getUsers,
} from './controllers/usersControllers';
import { logMiddleware } from './middlewares/logMiddleware';
import {
    searchController,
    suggestController,
} from './controllers/searchControllers';
import {
    createFeatureController,
    createHotelController,
    deleteHotelController,
    getHotelController,
    getAllHotelsController,
    updateHotelController,
} from './controllers/hotelControllers';
import {
    bookHotelController,
    createRoomController,
    deleteRoomController,
} from './controllers/roomControllers';

const PORT = process.env.PORT;

if (!PORT) {
    console.log('no PORT env provided');
    process.exit(1);
}

export const prisma = new PrismaClient();

seedAdmin();
seedRegions();

const app = express();

app.use(
    cors({
        origin: ['http://front', 'http://localhost:3000'],
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

const adminOnly = roleMiddleware([Role.ADMIN]);
const editorOnly = roleMiddleware([Role.ADMIN, Role.PARTNER]);

app.all('*', logMiddleware);

app.post('/api/signup', signupController);
app.post('/api/signin', signinController);

app.get('/api/profile', authMiddleware, getProfile);

app.get('/api/users', authMiddleware, adminOnly, getUsers);
app.delete('/api/user/:id', authMiddleware, adminOnly, deleteUser);

app.get('/api/search_hotels', searchController);
app.get('/api/suggest_hotels', suggestController);

app.get('/api/hotels', getAllHotelsController);
app.get('/api/hotel/:id', getHotelController);
app.post('/api/hotel', authMiddleware, editorOnly, createHotelController);
app.patch('/api/hotel/:id', authMiddleware, editorOnly, updateHotelController);
app.delete('/api/hotel/:id', authMiddleware, editorOnly, deleteHotelController);

app.post(
    '/api/hotel_feature',
    authMiddleware,
    editorOnly,
    createFeatureController,
);
app.delete(
    '/api/hotel_feature/:id',
    authMiddleware,
    editorOnly,
    deleteHotelController,
);

app.post('/api/hotel_room', authMiddleware, editorOnly, createRoomController);
app.delete(
    '/api/hotel_room/:id',
    authMiddleware,
    editorOnly,
    deleteRoomController,
);

app.post('/api/book', authMiddleware, bookHotelController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
