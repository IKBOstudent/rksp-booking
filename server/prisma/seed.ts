import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

const adminUser = {
    name: 'admin',
    email: 'admin@mail.ru',
    password: 'admin',
    role: Role.ADMIN,
};

const main = async () => {
    try {
        console.log('executing seed...');
        await prisma.user.create({
            data: adminUser,
        });
    } catch (err) {
        console.log('error executing seed');
    }
};

main().finally(async () => {
    await prisma.$disconnect();
});
