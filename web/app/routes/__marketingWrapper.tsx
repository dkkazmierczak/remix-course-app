import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import marketingStyles from '../styles/marketing.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: marketingStyles }];

export default function MarketingAppLayout() {
  return <Outlet />;
}
