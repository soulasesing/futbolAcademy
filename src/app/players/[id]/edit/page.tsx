import PlayerForm from '../../PlayerForm'
import { prisma } from '@/lib/prisma'

export default async function EditPlayerPage({ params }: { params: { id: string } }) {
  const player = await prisma.player.findUnique({
    where: { id: params.id },
    include: { user: true, team: true },
  })
  if (!player) {
    return <div className="p-6">Player not found</div>
  }
  const teams = await prisma.team.findMany()
  const academies = await prisma.academy.findMany()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Player</h1>
      <PlayerForm player={player} teams={teams} academies={academies} />
    </main>
  )
}
