import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '../../../components/util/Modal';
import { useNavigate } from '@remix-run/react';
import { type LoaderArgs } from '@remix-run/node';
import { getExpense } from '~/data/expenses.server';

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

export async function loader({ params }: LoaderArgs) {
  const expenseId = params.id;
  const expense = await getExpense(expenseId);
  return expense;
}
