import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '../../../components/util/Modal';
import { useNavigate } from '@remix-run/react';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { type LoaderArgs, redirect } from '@remix-run/node';
import { validateExpenseInput } from '~/data/validation.server';
// import { type LoaderArgs } from '@remix-run/node';
// import { getExpense } from '~/data/expenses.server';

// window.location.href (url)
export const meta = ({ params, location, data, parentsData }) => {
  const expense = parentsData['routes/__expensesWrapper/expenses'].find(expense => expense.id === params.id);
  return {
    title: `Edit ${expense.title}`,
    description: `Update ${expense.title}`,
  };
};

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate('..');
  };

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export async function loader({ params }: LoaderArgs) {
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   return expense;
// }

export async function action({ request, params }: LoaderArgs) {
  const expenseId = params.id;

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }
    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return { deletedId: expenseId };
  }
}
