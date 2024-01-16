import React from 'react'
import Search from './Search'
import TableUI from './TableUI'
import { itemsTest } from '../../utils/data'

function Toolbar() {
  return (
    <>
     <Search isIndicadores={true} />
      <TableUI items={itemsTest} isIndicador={false} />
    </>
  )
}

export default Toolbar