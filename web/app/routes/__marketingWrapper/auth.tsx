import AuthForm from '~/components/auth/AuthForm';
import authStyles from '../../styles/authStyles.css';
import { type LinksFunction, type LoaderArgs } from '@remix-run/node';
import { validateCredentials } from '~/data/validation.server';
import { login, signup } from '~/data/auth.server';

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
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error) {
    if (/(422|401|403)/.test(error.status)) {
      return { credentials: error.message };
    }
    return { credentials: 'Something went wrong!' };
  }
}

export function headers({ actionHeaders, loaderHeaders, parentHeaders }: HeadersArgs) {
  return {
    'cache-control': parentHeaders.get('cache-control'), // 60 minutes
  };
}
