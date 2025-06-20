import PlayerForm from '../PlayerForm'
import { prisma } from '@/lib/prisma'

export default async function NewPlayerPage() {
  const teams = await prisma.team.findMany()
  const academies = await prisma.academy.findMany()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Player</h1>
      <PlayerForm teams={teams} academies={academies} />
    </main>
  )
}
