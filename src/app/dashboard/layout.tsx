import { ReactNode } from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LogoutButton from '../../components/LogoutButton';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden md:flex flex-col w-64 h-screen bg-white shadow-lg p-6 space-y-4 fixed">
        <h2 className="text-2xl font-bold mb-8">Fútbol Academy</h2>
        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/dashboard" className="px-4 py-2 rounded hover:bg-blue-100">Dashboard</Link>
          <Link href="#" className="px-4 py-2 rounded hover:bg-blue-100">Teams</Link>
          <Link href="#" className="px-4 py-2 rounded hover:bg-blue-100">Players</Link>
          <Link href="#" className="px-4 py-2 rounded hover:bg-blue-100">Matches</Link>
          <Link href="#" className="px-4 py-2 rounded hover:bg-blue-100">Sessions</Link>
          <Link href="#" className="px-4 py-2 rounded hover:bg-blue-100">Messages</Link>
        </nav>
        <LogoutButton />
      </aside>
      <div className="flex-1 md:ml-64 w-full">{children}</div>
    </div>
  );
}
