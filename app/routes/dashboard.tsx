import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUser } from '~/utils/auth.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { DashboardHeader } from '~/components/dashboard/DashboardHeader';
import { MetricsOverview } from '~/components/dashboard/MetricsOverview';
import { QuickActions } from '~/components/dashboard/QuickActions';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <MetricsOverview user={user} />
        <QuickActions />
      </main>
    </div>
  );
}