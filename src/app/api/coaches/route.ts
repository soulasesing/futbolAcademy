import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET() {
  const coaches = await prisma.user.findMany({
    where: { role: 'COACH' },
    select: { id: true, name: true, email: true },
  });
  return NextResponse.json(coaches);
}

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, password } = data;
  const academy = await prisma.academy.findFirst();
  if (!academy) {
    return NextResponse.json({ error: 'No academy found' }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const coach = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: 'COACH',
      academyId: academy.id,
    },
  });
  return NextResponse.json(coach, { status: 201 });
}
