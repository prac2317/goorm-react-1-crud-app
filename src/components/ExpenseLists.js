import ExpenseList from './ExpenseList';
import './ExpenseLists.css';

export default function ExpenseLists({
  item,
  expenseUpdate,
  expenseDelete,
  deleteAllItem,
}) {
  return (
    <>
      <div className="list-container">
        {item.map((item) => (
          <ExpenseList
            expenseUpdate={expenseUpdate}
            expenseDelete={expenseDelete}
            item={item}
            key={item.key}
          />
        ))}
        <button className="delete-btn" onClick={deleteAllItem}>
          목록 지우기
        </button>
      </div>
    </>
  );
}
