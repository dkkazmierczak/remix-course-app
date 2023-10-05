import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import expensesStyles from '../styles/expenses.css';
import ExpensesHeader from '~/components/navigation/ExspensesHeader';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: expensesStyles }];

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}
