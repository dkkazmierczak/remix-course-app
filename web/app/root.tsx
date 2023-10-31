import type { LinksFunction } from '@remix-run/node';
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';
import sharedStyles from './styles/shared.css';
import Error from './components/util/Error';

export const meta = () => ({
  charset: 'utf-8',
  title: 'Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: sharedStyles }];

type DocumentProps = {
  title?: string;
  children: React.ReactNode;
};

const Document = ({ title, children }: DocumentProps) => {
  return (
    <html lang='en'>
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap' rel='stylesheet' />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

// if an error response id generated
// this ain't working,
// this should be triggered when wrong path is passed to the url,
export function CatchBoundary() {
  const caugthResponse = useCatch();
  return (
    <Document title={caugthResponse.statusText}>
      <main>
        <Error title={caugthResponse.statusText}>
          <p>{caugthResponse.data?.message ?? 'Something went wrong.'}</p>
          <p>
            Back to <Link to='/'>safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}

// for all different kinds of errors
export function ErrorBoundary({ error }) {
  return (
    <Document title='An error occured'>
      <main>
        <Error title='An error occured'>
          <p>{error.message ?? 'Something went wrong.'}</p>
          <p>
            Back to <Link to='/'>safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}
