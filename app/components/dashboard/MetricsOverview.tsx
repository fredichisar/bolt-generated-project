import { calculateBMI } from '~/utils/health.server';

export function MetricsOverview({ user }: { user: any }) {
  const bmi = user.height && user.weight ? calculateBMI(user.height, user.weight) : null;
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">BMI</h3>
        {bmi ? (
          <>
            <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {bmi.toFixed(1)}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {getBMICategory(bmi)}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Complete your profile to see your BMI
          </p>
        )}
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Daily Progress</h3>
        <div className="mt-2">
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2 w-1/3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          2/6 daily goals completed
        </p>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Weekly Streak</h3>
        <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          3 days
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Keep going! You're doing great!
        </p>
      </div>
    </div>
  );
}