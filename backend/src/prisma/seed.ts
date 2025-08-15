// backend/src/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: 'user_1',
        email: 'alice@example.com',
        name: 'Alice',
        birthDate: new Date('1995-01-01'),
        gender: 'female',
        genderPreference: 'male',
        bio: 'Loves hiking and coffee.',
        isVerified: true,
      },
      {
        id: 'user_2',
        email: 'bob@example.com',
        name: 'Bob',
        birthDate: new Date('1990-05-15'),
        gender: 'male',
        genderPreference: 'female',
        bio: 'Music lover and traveler.',
        isVerified: true,
      },
    ],
  });

  console.log('Seeded users');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });