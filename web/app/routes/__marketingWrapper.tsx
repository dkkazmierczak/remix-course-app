import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import marketingStyles from '../styles/marketing.css';
import MainHeader from '~/components/navigation/MainHeader';
import { getUserFromSession } from '~/data/auth.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: marketingStyles }];

export default function MarketingAppLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export function loader({ request }: LoaderArgs) {
  return getUserFromSession(request);
}

export function headers() {
  return {
    'cache-control': 'max-age=3600', // 60 minutes
  };
}
