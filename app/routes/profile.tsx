import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useActionData } from '@remix-run/react';
import { requireUser } from '~/utils/auth.server';
import { User } from '~/models/user.server';
import { calculateBMI, getBMICategory } from '~/utils/health.server';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import clsx from 'clsx';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const form = await request.formData();

  const height = Number(form.get('height'));
  const weight = Number(form.get('weight'));
  const gender = form.get('gender');
  const birthDate = form.get('birthDate');

  if (!height || !weight || !gender || !birthDate) {
    return json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    await User.findByIdAndUpdate(user._id, {
      height,
      weight,
      gender,
      birthDate,
      updatedAt: new Date(),
    });

    return redirect('/dashboard');
  } catch (error) {
    return json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const bmi = user.height && user.weight ? calculateBMI(user.height, user.weight) : null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>

          {bmi && (
            <div className="mb-6 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
              <p className="text-lg font-medium text-indigo-700 dark:text-indigo-300">
                Your BMI: {bmi.toFixed(1)} - {getBMICategory(bmi)}
              </p>
            </div>
          )}

          <Form method="post" className="space-y-6">
            {actionData?.error && (
              <div className="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                {actionData.error}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label 
                  htmlFor="height" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  defaultValue={user.height}
                  className={clsx(
                    "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                    "focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600",
                    "dark:bg-gray-700 dark:text-white"
                  )}
                />
              </div>

              <div>
                <label 
                  htmlFor="weight" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  defaultValue={user.weight}
                  className={clsx(
                    "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                    "focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600",
                    "dark:bg-gray-700 dark:text-white"
                  )}
                />
              </div>

              <div>
                <label 
                  htmlFor="gender" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue={user.gender}
                  className={clsx(
                    "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                    "focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600",
                    "dark:bg-gray-700 dark:text-white"
                  )}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label 
                  htmlFor="birthDate" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  defaultValue={user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : ''}
                  className={clsx(
                    "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                    "focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600",
                    "dark:bg-gray-700 dark:text-white"
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={clsx(
                  "rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white",
                  "hover:bg-indigo-700 focus:outline-none focus:ring-2",
                  "focus:ring-indigo-500 focus:ring-offset-2"
                )}
              >
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}