import React from 'react'
import MainLayout from '../layout/MainLayout'
import Search from '../components/Search'
import TableUI from '../components/TableUI'
import { columnsTest, itemsTest } from '../utils/data'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";



function Indicadores() {

 
  return (
    <MainLayout>
      <Search isIndicadores={true}/>
      <TableUI items={itemsTest} />
    </MainLayout>
  )
}

export default Indicadores