import React, { useContext } from 'react'
import Tr from './Tr'
import { TableContext } from './MineSearch'

function Table() {
  const { tableData } = useContext(TableContext);
  return (
    <table style={{borderCollapse: 'collapse', margin: '0 auto', }}>
      {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
    </table>
  )
};

export default Table