import React from 'react'
import MainLayout from '../layout/MainLayout'
import Search from '../components/Search'
import TableUI from '../components/TableUI'
import { columnsTest, itemsTest } from '../utils/data'

function Plantilla() {
  return (
    <MainLayout>
      <Search/>
      <TableUI items={itemsTest} columns={columnsTest}/>
    </MainLayout>
  )
}


export default Plantilla