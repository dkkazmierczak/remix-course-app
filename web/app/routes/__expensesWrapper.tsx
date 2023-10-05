import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import expensesStyles from '../styles/expenses.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: expensesStyles }];

export default function ExpensesAppLayout() {
  return <Outlet />;
}
