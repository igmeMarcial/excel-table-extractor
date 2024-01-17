import React from 'react'
import MainLayout from '../../layout/MainLayout'
import Search from '../indicadores/Search'

function Configuracion() {
  return (
    <MainLayout>
      <Search isIndicadores={true}/>
    </MainLayout>
  )
}

export default Configuracion