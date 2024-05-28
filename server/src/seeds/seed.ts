import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { regionsDataset } from '../data/regions';
import { prisma } from '..';

const adminUser = {
    name: 'admin',
    email: 'admin@mail.ru',
    password: 'admin',
    role: Role.ADMIN,
};

export const seedAdmin = async () => {
    try {
        console.log('executing seed admin...');

        const { name, email, password, role } = adminUser;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
        console.log('seed admin done.');
    } catch (err) {
        console.log('error executing seed admin');
    }
};

export const seedRegions = async () => {
    try {
        console.log('executing seed regions...');

        const batch = regionsDataset.map((region) => {
            return prisma.region.create({
                data: {
                    name: region.city,
                    lat: parseFloat(region.lat),
                    lon: parseFloat(region.lon),
                },
            });
        });

        await prisma.$transaction(batch);

        console.log('seed regions done.');
    } catch (err) {
        console.log('error executing seed regions');
    }
};
