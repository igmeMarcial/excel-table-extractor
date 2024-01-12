import React from 'react'
import MainLayout from '../layout/MainLayout'
import Search from '../components/Search'
import TableUI from '../components/TableUI'
import { columnsTest, itemsTest } from '../utils/data'
import {
  createColumnHelper,
} from "@tanstack/react-table";

function Plantilla() {


  return (
    <MainLayout>
      <Search isIndicadores={false}/>
      <TableUI items={itemsTest}/>
    </MainLayout>
  )
}


export default Plantilla