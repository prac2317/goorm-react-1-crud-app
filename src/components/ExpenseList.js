import './ExpenseList.css';

export default function ExpenseList({
  expenseUpdate,
  expenseDelete,
  item = { item },
}) {
  return (
    <>
      <div key={item.id} className="expense">
        <div>{item.expenseName}</div>
        <div>{item.expenseCost}</div>
        <button className="icon-btn" onClick={() => expenseUpdate(item.id)}>
          수정
        </button>
        <button className="icon-btn" onClick={() => expenseDelete(item.id)}>
          삭제
        </button>
      </div>
    </>
  );
}
