import React, { useCallback, useContext, useState } from 'react';
import { START_GAME, TableContext } from './MineSearch';

function Form() {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(10);
  const { dispatch } = useContext(TableContext); // 디스패치는 구분할 원래는 value

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
    
  }, [row, cell, mine]);

  return (
    <div>
      <input type="number" placeholder='세로' value={row} onChange={onChangeRow} />
      <input type="number" placeholder='가로' value={cell} onChange={onChangeCell} />
      <input type="number" placeholder='지뢰' value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
};

export default Form;