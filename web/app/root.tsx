import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import MainHeader from './components/navigation/MainHeader';
import sharedStyles from './styles/shared.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: sharedStyles }];

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap' rel='stylesheet' />
        <Links />
      </head>
      <body>
        <MainHeader />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
