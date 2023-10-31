import { type HeadersArgs, json, type LoaderArgs } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/ExpensesList';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export default function ExpensesLayout() {
  const expenses = useLoaderData<typeof loader>();

  const hasExpenses = expenses && expenses.length > 0;
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
        {hasExpenses ? (
          <ExpensesList expenses={expenses} />
        ) : (
          <section id='no-expenses'>
            <h1>No expenses found.</h1>
            <p>
              Start by <Link to='add'>adding one</Link>.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  // return expenses;
  return json(expenses, {
    headers: {
      'cache-control': 'max-age=3',
    },
  });
}

export function headers({ actionHeaders, loaderHeaders, parentHeaders }: HeadersArgs) {
  return {
    'cache-control': loaderHeaders.get('cache-control'), // 60 minutes
  };
}
