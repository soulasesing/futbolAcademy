'use client';

import { useEffect, useState } from 'react';

interface Coach {
  id: string;
  name: string;
  email: string;
}

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editing, setEditing] = useState<Coach | null>(null);

  const fetchCoaches = async () => {
    const res = await fetch('/api/coaches');
    if (res.ok) {
      setCoaches(await res.json());
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch(`/api/coaches/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
    } else {
      await fetch('/api/coaches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
    }
    setName('');
    setEmail('');
    setPassword('');
    setEditing(null);
    fetchCoaches();
  };

  const handleEdit = (coach: Coach) => {
    setEditing(coach);
    setName(coach.name);
    setEmail(coach.email);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/coaches/${id}`, { method: 'DELETE' });
    fetchCoaches();
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Coaches</h1>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!editing}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editing ? 'Update Coach' : 'Create Coach'}
        </button>
        {editing && (
          <button
            type="button"
            className="ml-2 px-4 py-2 bg-gray-300 rounded"
            onClick={() => {
              setEditing(null);
              setName('');
              setEmail('');
              setPassword('');
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map((coach) => (
            <tr key={coach.id} className="border-b">
              <td className="p-2">{coach.name}</td>
              <td className="p-2">{coach.email}</td>
              <td className="p-2 space-x-2 text-center">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleEdit(coach)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(coach.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
