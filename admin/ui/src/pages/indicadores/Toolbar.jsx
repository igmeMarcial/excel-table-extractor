import React from 'react';

import IndicadorList from './IndicadorList';
import SearchIndicadores from './SearchIndicadores';

function Toolbar() {
  return (
    <>
      <SearchIndicadores isIndicadores={true} />
      <IndicadorList />
    </>
  );
}

export default Toolbar;
