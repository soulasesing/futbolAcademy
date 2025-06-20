import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const player = await prisma.player.findUnique({
    where: { id: params.id },
    include: { user: true, team: true },
  })
  if (!player) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(player)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json()
  const { name, email, password, teamId, stats } = data

  const player = await prisma.player.findUnique({ where: { id: params.id } })
  if (!player) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await prisma.player.update({
    where: { id: params.id },
    data: { teamId, stats },
  })

  if (name || email || password) {
    const userData: any = {}
    if (name) userData.name = name
    if (email) userData.email = email
    if (password) userData.password = await bcrypt.hash(password, 10)
    await prisma.user.update({ where: { id: player.userId }, data: userData })
  }

  const updated = await prisma.player.findUnique({
    where: { id: params.id },
    include: { user: true, team: true },
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const player = await prisma.player.findUnique({ where: { id: params.id } })
  if (!player) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  await prisma.player.delete({ where: { id: params.id } })
  await prisma.user.delete({ where: { id: player.userId } })
  return NextResponse.json({ message: 'Deleted' })
}
