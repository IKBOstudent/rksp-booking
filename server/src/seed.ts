import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const adminUser = {
    name: 'admin',
    email: 'admin@mail.ru',
    password: 'admin',
    role: Role.ADMIN,
};

export const seed = async () => {
    try {
        console.log('executing seed...');

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
        console.log('done.');
    } catch (err) {
        console.log('error executing seed');
    }
};
