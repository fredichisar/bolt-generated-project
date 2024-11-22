import { json, unstable_parseMultipartFormData } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { requireUser } from '~/utils/auth.server';
import { Meal } from '~/models/meal.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import clsx from 'clsx';

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  
  try {
    const formData = await request.formData();
    const type = formData.get('type');
    const name = formData.get('name');
    const photoData = formData.get('photo');

    if (!type || !name) {
      return json({ error: 'Type and name are required' }, { status: 400 });
    }

    // TODO: Implement photo processing and nutritional analysis
    // For now, we'll use placeholder data
    const meal = await Meal.create({
      userId: user._id,
      type,
      name,
      calories: 500,
      nutrients: {
        proteins: 20,
        carbs: 60,
        fats: 20,
      },
      score: 75,
    });

    return json({ success: true, meal });
  } catch (error) {
    return json({ error: 'Failed to save meal' }, { status: 500 });
  }
}

export default function TrackMeal() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Track Your Meal
          </h1>

          <Form method="post" encType="multipart/form-data" className="space-y-6">
            {actionData?.error && (
              <div className="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                {actionData.error}
              </div>
            )}

            <div>
              <label 
                htmlFor="type" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Meal Type
              </label>
              <select
                id="type"
                name="type"
                className={clsx(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                  "focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600",
                  "dark:bg-gray-700 dark:text-white"
                )}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Meal Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={clsx(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                  "focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600",
                  "dark:bg-gray-700 dark:text-white"
                )}
              />
            </div>

            <div>
              <label 
                htmlFor="photo" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Photo
              </label>
              <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-600">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="photo"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-800 dark:text-indigo-400"
                    >
                      <span>Take a photo</span>
                      <input 
                        id="photo" 
                        name="photo" 
                        type="file" 
                        accept="image/*"
                        capture="environment"
                        className="sr-only" 
                      />
                    </label>
                  </div>
                </div>
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
                Save Meal
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}