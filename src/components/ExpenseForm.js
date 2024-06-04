import './ExpenseForm.css';

export default function ExpenseForm({
  expenseName,
  setExpenseName,
  expenseCost,
  setExpenseCost,
  expenseSubmit,
  isUpdateActivated,
}) {
  const onChangeExpenseName = (event) => {
    setExpenseName(event.target.value);
  };
  const onChangeExpenseCost = (event) => {
    setExpenseCost(event.target.value);
  };

  return (
    <>
      <div className="input-container">
        <div className="expense-name">
          <span>지출 항목</span>
          <input
            value={expenseName}
            onChange={onChangeExpenseName}
            placeholder={'예) 렌트비'}
          ></input>
        </div>
        <div className="expense-cost">
          <span>비용</span>
          <input value={expenseCost} onChange={onChangeExpenseCost}></input>
        </div>
        <button className="input-btn" onClick={expenseSubmit}>
          {isUpdateActivated ? '수정' : '제출'}
        </button>
      </div>
    </>
  );
}
