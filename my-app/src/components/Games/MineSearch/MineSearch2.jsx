import React, { useReducer, useEffect } from 'react';

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
};

const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  console.log('Reducer 실행:', action); // 리듀서 확인
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: Array(action.row).fill().map(() => Array(action.cell).fill('')),
      };
    default:
      return state;
  }
};

function MineSearch2() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('MineSearch 컴포넌트 렌더링:', state); // 초기 렌더링 확인
    dispatch({ type: START_GAME, row: 5, cell: 5, mine: 5 }); // 디스패치 테스트
  }, []);

  return (
    <div>
      <table>
        {state.tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default MineSearch2;