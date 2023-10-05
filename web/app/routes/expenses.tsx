import { Outlet } from '@remix-run/react';
import styles from '../styles/expenses.css';
import type { LinksFunction } from '@remix-run/node';
import ExpensesList from '~/components/expenses/ExpensesList';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date().toISOString(),
  },
  {
    id: 'e2',
    title: 'New TV',
    amount: 799.49,
    date: new Date().toISOString(),
  },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date().toISOString(),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date().toISOString(),
  },
];

export default function ExpensesLayout() {
  return (
    <>
      <Outlet />
      <main>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
