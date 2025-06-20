import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create an academy
  const academy = await prisma.academy.create({
    data: {
      name: 'Elite Soccer Academy',
      description: 'A top-tier soccer academy for youth development.',
    },
  });

  // Create users with different roles
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@academy.com',
      password: await bcrypt.hash('adminpass', 10),
      role: 'ADMIN',
      academyId: academy.id,
    },
  });

  const coach = await prisma.user.create({
    data: {
      name: 'Coach Carter',
      email: 'coach@academy.com',
      password: await bcrypt.hash('coachpass', 10),
      role: 'COACH',
      academyId: academy.id,
    },
  });

  const parent = await prisma.user.create({
    data: {
      name: 'Parent Paula',
      email: 'parent@academy.com',
      password: await bcrypt.hash('parentpass', 10),
      role: 'PARENT',
      academyId: academy.id,
    },
  });

  const playerUser = await prisma.user.create({
    data: {
      name: 'Player Pete',
      email: 'player@academy.com',
      password: await bcrypt.hash('playerpass', 10),
      role: 'PLAYER',
      academyId: academy.id,
    },
  });

  // Create a team
  const team = await prisma.team.create({
    data: {
      name: 'U16 Stars',
      academyId: academy.id,
    },
  });

  // Create a player profile and assign to team
  await prisma.player.create({
    data: {
      userId: playerUser.id,
      teamId: team.id,
      stats: {},
      documents: {},
      photos: {},
    },
  });

  console.log('Seed data created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 