import React from 'react'
import MainLayout from '../layout/MainLayout'
import Search from '../components/Search'
import TableUI from '../components/TableUI'
import { columnsTest, itemsTest } from '../utils/data'




function Indicadores() {
  return (
    <MainLayout>
      <Search isIndicadores={true}/>
      <TableUI items={itemsTest} columns={columnsTest}/>
    </MainLayout>
  )
}

export default Indicadores