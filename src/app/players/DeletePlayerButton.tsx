'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeletePlayerButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this player?')) return
    setLoading(true)
    await fetch(`/api/players/${id}`, { method: 'DELETE' })
    setLoading(false)
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="text-red-600">
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}
