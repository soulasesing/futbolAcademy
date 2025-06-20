import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const coach = await prisma.user.findFirst({
    where: { id: params.id, role: 'COACH' },
  });
  if (!coach) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(coach);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const { name, email, password } = data;
  const updateData: any = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }
  const coach = await prisma.user.update({
    where: { id: params.id },
    data: updateData,
  });
  return NextResponse.json(coach);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
