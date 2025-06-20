import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import DashboardContent from './DashboardContent';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }
  const role = (session.user as any).role || 'ADMIN';
  const name = session.user.name || session.user.email;

  return <DashboardContent role={role} name={name} />;
}