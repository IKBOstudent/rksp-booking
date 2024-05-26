import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

const adminUser = {
    email: 'admin@mail.ru',
    name: 'admin',
    password: 'admin',
    role: Role.ADMIN,
};

const main = async () => {
    console.log('executing seed');
    await prisma.user.create({
        data: adminUser,
    });
};

main()
    .then(() => {
        console.log('done.');
    })
    .catch((e) => {
        console.log('error executing seed', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
