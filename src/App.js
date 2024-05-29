import { useState } from 'react';
import './App.css';

function App() {
  const [item, setItem] = useState([
    {
      id: '1',
      expenseName: '사과',
      expenseCost: '200원',
    },
    {
      id: '2',
      expenseName: '배',
      expenseCost: '300원',
    },
    {
      id: '3',
      expenseName: '딸기',
      expenseCost: '400원',
    },
  ]);
  const [expenseName, setExpenseName] = useState();
  const [expenseCost, setExpenseCost] = useState();

  const onChangeExpenseName = (event) => {
    setExpenseName(event.target.value);
    console.log(expenseName);
  };

  const onChangeExpenseCost = (event) => {
    setExpenseCost(event.target.value);
    console.log(expenseCost);
  };

  //새로운 expense 생성
  const expenseSubmit = () => {
    console.log('작동했는지');
    console.log(expenseName);
    console.log(expenseCost);
    const newItem = {
      id: new Date().getTime(),
      expenseName,
      expenseCost,
    };
    setItem([...item, newItem]);
    setExpenseName('');
    setExpenseCost('');
    console.log(item);
  };

  const expenseDelete = (id) => {
    console.log('delete 작동했는지');
    // setItem과 id 활용해서 해당 객체 찾고, 삭제해주기
    const index = item.findIndex((item) => item.id === id);
    console.log(index);
    const newItem = [...item];
    newItem.splice(index, 1);
    setItem(newItem);
  };

  return (
    <div className="App">
      <div className="message-box">아이템이 삭제되었습니다</div>
      <h1>예산 계산기</h1>
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
            제출
          </button>
        </div>
        <div className="list-container">
          {item.map((item) => (
            <div key={item.id} className="expense">
              <div>{item.expenseName}</div>
              <div>{item.expenseCost}</div>
              <button className="icon-btn">수정</button>
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
      <div className="total-cost">총지출</div>
    </div>
  );
}

export default App;
