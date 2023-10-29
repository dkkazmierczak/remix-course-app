import { type LoaderArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import Chart from '~/components/expenses/Chart';
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData<typeof loader>();

  const hasExpenses = expenses && expenses.length > 0;
  return (
    <main>
      {hasExpenses ? (
        <>
          <Chart expenses={expenses} />
          <ExpenseStatistics expenses={expenses} />
        </>
      ) : (
        <section id='no-expenses'>
          <h1>No expenses found.</h1>
          <p>
            Start by <Link to='/expenses/add'>adding one</Link>.
          </p>
        </section>
      )}
    </main>
  );
}

export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);
  const expenses = await getExpenses();
  return expenses;
}
