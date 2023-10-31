import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { useNavigate } from '@remix-run/react';
import { addExpense } from '~/data/expenses.server';
import { type LoaderArgs, redirect } from '@remix-run/node';
import { validateExpenseInput } from '~/data/validation.server';
import { requireUserSession } from '~/data/auth.server';

export default function AddExpensesPage() {
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

export async function action({ request, params }: LoaderArgs) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  // formData.get('title');
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect('/expenses');
}
