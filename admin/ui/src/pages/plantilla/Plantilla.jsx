import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { columnsTestPlantilla, itemsTestPlantilla } from '../../utils/data'
import TablePlantilla from './TablePlantilla'
import { SearchInput } from '../../components/SearchInput'

function Plantilla() {
  const[value,setValue] = useState("");
  return (
    <MainLayout>
      <SearchInput type="search" label="inputPlantilla" value={value} name="inputPlantilla" placeholder="Buscar" error={false} disabled={false} onChange={(e)=>{setValue(e.target.value)}} isAnuario={false}/>
      <TablePlantilla items={itemsTestPlantilla}  columns={columnsTestPlantilla}/>
    </MainLayout>
  )
}


export default Plantilla