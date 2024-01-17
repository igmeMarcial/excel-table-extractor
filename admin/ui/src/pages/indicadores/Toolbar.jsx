import React from 'react'
import Search from './Search'
import IndicadoresList from './IndicadoresList'

function Toolbar() {
  return (
    <>
     <Search isIndicadores={true} />
      <IndicadoresList/>
    </>
  )
}

export default Toolbar