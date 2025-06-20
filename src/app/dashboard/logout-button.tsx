"use client";
import { signOut } from 'next-auth/react';
import { useTransition } from 'react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => signOut({ callbackUrl: '/login' }))}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-semibold disabled:opacity-50"
      disabled={isPending}
    >
      {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
    </button>
  );
} 