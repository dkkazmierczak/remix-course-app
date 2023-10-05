import { Link, Outlet } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/ExpensesList';

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
        <section id='expenses-actions'>
          <Link to='add'>
            <FaPlus />
            <span>Add expense</span>
          </Link>
          <a href='/expenses/raw'>
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
