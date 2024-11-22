import { Link } from '@remix-run/react';

export function QuickActions() {
  const actions = [
    {
      title: "Track Meal",
      description: "Log your food intake",
      href: "/meals/track",
      icon: "🍽️"
    },
    {
      title: "Shopping List",
      description: "Manage your grocery list",
      href: "/shopping-list",
      icon: "🛒"
    },
    {
      title: "Daily Exercise",
      description: "View today's workout plan",
      href: "/exercises",
      icon: "💪"
    }
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.href}
            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow transition hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <span className="text-2xl">{action.icon}</span>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {action.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}