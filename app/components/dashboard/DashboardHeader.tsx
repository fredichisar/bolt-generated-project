import { Link } from '@remix-run/react';
import { UserCircle } from '~/components/icons/UserCircle';

export function DashboardHeader({ user }: { user: any }) {
  return (
    <header className="bg-white shadow dark:bg-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.name}!
          </h1>
          
          <Link 
            to="/profile"
            className="flex items-center gap-2 rounded-full bg-gray-100 p-2 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {user.picture ? (
              <img src={user.picture} alt="" className="h-8 w-8 rounded-full" />
            ) : (
              <UserCircle className="h-8 w-8" />
            )}
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
}