import { useState } from 'react';
import './App.css';

function App() {
  const [item, setItem] = useState([]);
  const [expenseName, setExpenseName] = useState();
  const [expenseCost, setExpenseCost] = useState();
  const [isUpdateActivated, setIsUpdateActivated] = useState(false);
  const [currentId, setCurrentID] = useState('');
  const [alert, setAlert] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const onChangeExpenseName = (event) => {
    setExpenseName(event.target.value);
  };

  const onChangeExpenseCost = (event) => {
    setExpenseCost(event.target.value);
  };

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
    setExpenseCost('');
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
    console.log(sum);
  };

  const sum = item.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.expenseCost),
    0
  );

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
      <div className="title">
        <h1>예산 계산기</h1>
      </div>
      {/* 각 div들 이름 어떻게 작성했는지 비교하기 */}
      <div className="container">
        <div className="input-container">
          {/* 지출 뭐라고 표시했을지 확인 */}
          <div className="expense-name">
            <span>지출 항목</span>
            <input value={expenseName} onChange={onChangeExpenseName}></input>
          </div>
          <div className="expense-cost">
            <span>비용</span>
            <input value={expenseCost} onChange={onChangeExpenseCost}></input>
          </div>
          <button className="input-btn" onClick={expenseSubmit}>
            {isUpdateActivated ? '수정' : '제출'}
          </button>
        </div>
        <div className="list-container">
          {item.map((item) => (
            <div key={item.id} className="expense">
              <div>{item.expenseName}</div>
              <div>{item.expenseCost}</div>
              <button
                className="icon-btn"
                onClick={() => expenseUpdate(item.id)}
              >
                수정
              </button>
              <button
                className="icon-btn"
                onClick={() => expenseDelete(item.id)}
              >
                삭제
              </button>
            </div>
          ))}
          <button className="delete-btn">목록 지우기</button>
        </div>
      </div>
      <div className="total-cost">총지출 : {sum}원</div>
    </div>
  );
}

export default App;
