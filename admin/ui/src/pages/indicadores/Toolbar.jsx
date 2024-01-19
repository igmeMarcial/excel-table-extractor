import React from 'react'

import IndicadoresList from './IndicadoresList'
import SearchIndicadores from './SearchIndicadores'

function Toolbar() {
  return (
    <>
     <SearchIndicadores isIndicadores={true} />
      <IndicadoresList/>
    </>
  )
}

export default Toolbar