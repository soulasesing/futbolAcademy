"use client";
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="px-4 py-2 rounded hover:bg-red-100 text-red-600"
    >
      Cerrar sesión
    </button>
  );
}
