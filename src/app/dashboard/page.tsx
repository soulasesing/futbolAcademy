import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }
  interface SessionUser {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  }
  const user = session.user as SessionUser;
  const role = user.role || 'ADMIN';
  const name = user.name || user.email;

  const roleDashboards: Record<string, React.ReactNode> = {
    ADMIN: <div className="p-6 bg-blue-100 rounded">Admin Dashboard: Manage academies, users, and settings.</div>,
    COACH: <div className="p-6 bg-green-100 rounded">Coach Dashboard: View teams, schedule sessions, and track players.</div>,
    PLAYER: <div className="p-6 bg-yellow-100 rounded">Player Dashboard: See your stats, matches, and training progress.</div>,
    PARENT: (
      <div className="p-6 bg-pink-100 rounded">
        Parent Dashboard: Track your child&apos;s progress and communicate with coaches.
      </div>
    ),
  };

  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-4 text-lg">Welcome, <span className="font-semibold">{name}</span> (<span className="uppercase">{role}</span>)</div>
      {roleDashboards[role]}
    </main>
  );
} 
