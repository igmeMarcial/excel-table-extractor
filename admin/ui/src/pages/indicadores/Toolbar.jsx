import React from 'react';
import { Button } from '@fluentui/react-components';
import { SearchBox } from '@fluentui/react-search-preview';
import { MoreVertical24Filled, Add24Filled } from '@fluentui/react-icons';
import ModalIndicadores from './ModalIndicadores';
import { Link } from 'react-router-dom';
import { getNewPathUrl } from '../../hooks/usePathRoute';

function Toolbar() {
  return (
    <div className="flex px-4 pt-6 pb-4 gap-2">
      <SearchBox placeholder="Buscar" />
      <span className="flex-1"></span>
      <Link to={getNewPathUrl('indicadores/editar')}>
        <Button
          style={{ color: '#2271B1' }}
          appearance="subtle"
          icon={<Add24Filled />}
        >
          Registrar
        </Button>
      </Link>
      <ModalIndicadores />
      <Button appearance="subtle" icon={<MoreVertical24Filled />}></Button>
    </div>
  );
}

export default Toolbar;
