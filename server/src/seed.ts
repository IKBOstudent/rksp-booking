import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

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

const regionsDataset: { city: string; lon: number; lat: number }[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'regions.json'), 'utf8'),
);

export const seedRegions = async () => {
    try {
        console.log('executing seed regions...');

        const batch = regionsDataset.map((region) => {
            return prisma.region.create({
                data: {
                    name: region.city,
                },
            });
        });

        await prisma.batch(batch, { transaction: true });

        console.log('seed regions done.');
    } catch (err) {
        console.log('error executing seed regions');
    }
};
