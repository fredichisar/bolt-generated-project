import { json } from '@remix-run/node';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { authenticateWithGoogle, createUserSession } from '~/utils/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID must be set');
  }

  return json({ googleClientId: clientId });
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const token = form.get('credential');

  if (typeof token !== 'string') {
    return json({ error: 'Invalid credentials' }, { status: 400 });
  }

  try {
    const user = await authenticateWithGoogle(token);
    return createUserSession(user._id.toString(), '/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    return json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export default function Login() {
  const { googleClientId } = useLoaderData<typeof loader>();

  useEffect(() => {
    const loadGoogleScript = async () => {
      try {
        const existingScript = document.getElementById('google-signin');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.id = 'google-signin';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          if (!window.google) return;
          
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          
          const buttonElement = document.getElementById('googleButton');
          if (buttonElement) {
            window.google.accounts.id.renderButton(buttonElement, {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: 'continue_with',
              shape: 'rectangular',
              logo_alignment: 'left',
            });
          }
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Sign-In:', error);
      }
    };

    loadGoogleScript();

    return () => {
      const script = document.getElementById('google-signin');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [googleClientId]);

  async function handleCredentialResponse(response: any) {
    try {
      const form = new FormData();
      form.append('credential', response.credential);
      
      const result = await fetch('/login', {
        method: 'POST',
        body: form
      });

      if (result.ok) {
        window.location.href = '/dashboard';
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Start your journey to better health
          </p>
        </div>
        
        <div className="mt-8">
          <div id="googleButton" className="flex justify-center"></div>
        </div>
      </div>
    </div>
  );
}