import React, { createContext, useMemo, useReducer } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7, // 지뢰
  NORMAL: -1, // 빈칸
  QUESTION: -2, // 물음표
  FLAG: -3, // 깃발
  QUESTION_MINE: -4, // 물음표
  FLAG_MINE: -5, // 깃발 + 지뢰
  CLICKED_MINE: -6, // 지뢰 클릭
  OPENED: 0, // 0 이상이면 다 ONPENED
}

export const TableContext = createContext({
  tableData: [], 
  dispatch: () => {}, 
  halted: true,
});

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: true,
};

// 지뢰 심는 코드
const plantMine = (row, cell, mine) => { 
  console.log('plantMine 함수 실행:', row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen); // 지뢰의 개수만큼 숫자를 뽑아놓고 셔플이라는 배열에 저장
  }
  const data = []; // 2차원배열
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell); // 2차원 배열 계산 코드 [0,0] ~ [9,9]
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE; // 지뢰 심음
  }
  console.log(data);
  return data;
};

export const START_GAME = 'START_GAME'; // 액션 이름
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';


const reducer = (state, action) => {
  console.log('리듀서 실행:', action);
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine), // 지뢰심기
        halted: false,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED;

      // 사이드 칸 검사
      let around = [];
      if (tableData[action.row -1]) {
        around = around.concat(
          tableData[action.row -1][action.cell -1], 
          tableData[action.row -1][action.cell],
          tableData[action.row -1][action.cell +1],
        );
      }
      around = around.concat(
        tableData[action.row -1][action.cell -1], 
        tableData[action.row -1][action.cell +1],
      )
      if (tableData[action.row +1]) {
        around = around.concat(
          tableData[action.row +1][action.cell -1], 
          tableData[action.row +1][action.cell],
          tableData[action.row +1][action.cell +1],
        );
      }
      // 주변 칸 중 지뢰 개수 카운트
      const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
      tableData[action.row][action.cell] = count; // 개수 표시
      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICK_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      }
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      }
    }
    default:
      return state;
  }
};

function MineSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted } = state;

  const value = useMemo(() => ({tableData: tableData, halted: halted, dispatch}), [tableData, halted]);
// state.tableData값이 바뀔때만 렌더링하게 함(useMemo) - 성능저하 방지

console.log('현재 상태:', state);

  return (
    <TableContext.Provider value={value}> {/* context - 자식테이블에서 접근가능하게 함 */}
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;