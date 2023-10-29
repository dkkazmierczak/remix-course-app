import AuthForm from '~/components/auth/AuthForm';
import authStyles from '../../styles/authStyles.css';
import { redirect, type LinksFunction, type LoaderArgs } from '@remix-run/node';
import { validateCredentials } from '~/data/validation.server';
import { signup } from '~/data/auth.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: authStyles }];

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }: LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }
  try {
    if (authMode === 'login') {
      //login
    } else {
      await signup(credentials);
      return redirect('/expenses');
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
}
