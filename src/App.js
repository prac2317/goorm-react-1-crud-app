import { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseLists from './components/ExpenseLists';

function App() {
  const [item, setItem] = useState([]);
  const [expenseName, setExpenseName] = useState();
  const [expenseCost, setExpenseCost] = useState(0);
  const [isUpdateActivated, setIsUpdateActivated] = useState(false);
  const [currentId, setCurrentID] = useState('');
  const [alert, setAlert] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  // 알림창
  const showAlert = (message) => {
    setAlert(message);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      setAlert('');
    }, 3000);
    setTimeoutId(newTimeoutId);
  };

  //추가 + 삭제
  const expenseSubmit = () => {
    // 추가할 경우
    if (currentId === '') {
      const newItem = {
        id: new Date().getTime(),
        expenseName,
        expenseCost,
      };
      setItem([...item, newItem]);
      showAlert('생성');

      //수정할 경우
    } else {
      const index = item.findIndex((item) => item.id === currentId);
      item[index].expenseName = expenseName;
      item[index].expenseCost = expenseCost;
      setIsUpdateActivated(false);
      setCurrentID('');
      showAlert('수정');
    }

    // 입력창 비우기
    setExpenseName('');
    setExpenseCost(0);
  };

  //삭제
  const expenseDelete = (id) => {
    const index = item.findIndex((item) => item.id === id);
    const newItem = [...item];
    newItem.splice(index, 1);
    setItem(newItem);
    showAlert('삭제');
  };

  //수정
  const expenseUpdate = (id) => {
    setIsUpdateActivated(true);

    const index = item.findIndex((item) => item.id === id);
    const currentItem = item[index];

    setExpenseName(currentItem.expenseName);
    setExpenseCost(currentItem.expenseCost);
    setCurrentID(currentItem.id);
  };

  // 총지출 계산하기
  const sum = item.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.expenseCost),
    0
  );

  // 목록 지우기
  const deleteAllItem = () => {
    setItem([]);
    showAlert('삭제');
  };

  return (
    <div className="App">
      {alert && (
        <div
          className="message-box"
          style={{ backgroundColor: alert === '삭제' ? '#f44336' : '#4caf50' }}
        >
          아이템이 {alert} 되었습니다.
        </div>
      )}

      <div className="container">
        <div className="title">
          <h1>예산 계산기</h1>
        </div>
        <ExpenseForm
          expenseName={expenseName}
          setExpenseName={setExpenseName}
          expenseCost={expenseCost}
          setExpenseCost={setExpenseCost}
          expenseSubmit={expenseSubmit}
          isUpdateActivated={isUpdateActivated}
        />
        <ExpenseLists
          item={item}
          expenseUpdate={expenseUpdate}
          expenseDelete={expenseDelete}
          deleteAllItem={deleteAllItem}
        />
      </div>
      <div className="total-cost">총지출 : {sum}원</div>
    </div>
  );
}

export default App;
