import { Link } from "@remix-run/react";
import { MoonIcon } from "./icons/Moon";
import { SunIcon } from "./icons/Sun";

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Navigation({ theme, toggleTheme }: NavigationProps) {
  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                HealthyLife
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Dashboard
            </Link>
            <Link
              to="/meals/track"
              className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Track Meal
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Profile
            </Link>
            
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}