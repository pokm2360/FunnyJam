import React, { useContext } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

function Tr({ rowIndex }) {
  const { tableData } = useContext(TableContext);

  return (
      <tr>0
        {tableData[0] && Array(tableData[0].length).fill().map((td, i) => 
        <Td rowIndex={rowIndex} cellIndex={i}/>)}; 
        {/* tableData가 0일때를 대비 */}
      </tr>
  );
};

export default Tr;