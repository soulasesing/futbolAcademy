import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import DeletePlayerButton from './DeletePlayerButton'

export default async function PlayersPage() {
  const players = await prisma.player.findMany({ include: { user: true, team: true } })

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <Link href="/players/new" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Player
      </Link>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Team</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p: any) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.user.name}</td>
              <td className="px-4 py-2">{p.user.email}</td>
              <td className="px-4 py-2">{p.team?.name ?? '-'}</td>
              <td className="px-4 py-2 space-x-2">
                <Link href={`/players/${p.id}/edit`} className="text-blue-600">
                  Edit
                </Link>
                <DeletePlayerButton id={p.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
