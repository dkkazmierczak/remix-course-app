import AuthForm from '~/components/auth/AuthForm';
import authStyles from '../../styles/authStyles.css';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: authStyles }];

export default function AuthPage() {
  return <AuthForm />;
}
