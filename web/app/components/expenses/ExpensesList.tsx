import ExpenseListItem from './ExpenseListItem';

function ExpensesList({ expenses }: any) {
  return (
    <ol id='expenses-list'>
      {expenses?.map((expense: any) => (
        <li key={expense.id}>
          <ExpenseListItem id={expense.id} title={expense.title} amount={expense.amount} />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;
