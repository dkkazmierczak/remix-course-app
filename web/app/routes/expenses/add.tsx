import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '../../components/util/Modal';
import { useNavigate } from '@remix-run/react';

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
