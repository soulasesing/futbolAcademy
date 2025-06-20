import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  const players = await prisma.player.findMany({ include: { user: true, team: true } })
  return NextResponse.json(players)
}

export async function POST(request: Request) {
  const data = await request.json()
  const { name, email, password, academyId, teamId } = data
  if (!name || !email || !password || !academyId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: 'PLAYER', academyId },
  })
  const player = await prisma.player.create({
    data: { userId: user.id, teamId },
  })
  return NextResponse.json({ ...player, user }, { status: 201 })
}
