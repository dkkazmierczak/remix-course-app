import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '../../components/util/Modal';

export default function addExpensesPage() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  );
}
