import AuthForm from '~/components/auth/AuthForm';
import authStyles from '../../styles/authStyles.css';
import type { LinksFunction, LoaderArgs } from '@remix-run/node';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: authStyles }];

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }: LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  if (authMode === 'login') {
    //login
  } else {
    //signup
  }
}
