'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type PlayerFormProps = {
  teams: { id: string; name: string }[]
  academies: { id: string; name: string }[]
  player?: any
}

export default function PlayerForm({ teams, academies, player }: PlayerFormProps) {
  const router = useRouter()
  const [name, setName] = useState(player?.user.name ?? '')
  const [email, setEmail] = useState(player?.user.email ?? '')
  const [password, setPassword] = useState('')
  const [academyId, setAcademyId] = useState(player?.user.academyId ?? academies[0]?.id ?? '')
  const [teamId, setTeamId] = useState(player?.teamId ?? '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = player ? 'PUT' : 'POST'
    const url = player ? `/api/players/${player.id}` : '/api/players'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, academyId, teamId: teamId || null }),
    })
    router.push('/players')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input className="border px-2 py-1 w-full" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" className="border px-2 py-1 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      {!player && (
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="border px-2 py-1 w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium">Academy</label>
        <select className="border px-2 py-1 w-full" value={academyId} onChange={(e) => setAcademyId(e.target.value)}>
          {academies.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Team</label>
        <select className="border px-2 py-1 w-full" value={teamId ?? ''} onChange={(e) => setTeamId(e.target.value)}>
          <option value="">Unassigned</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {player ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
