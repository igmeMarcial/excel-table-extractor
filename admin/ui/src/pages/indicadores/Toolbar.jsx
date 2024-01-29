import React from 'react';
import { Button, Input } from '@fluentui/react-components';

import {
  MoreVertical24Filled,
  Add24Filled,
  Search24Regular,
} from '@fluentui/react-icons';
import ModalIndicadores from './ModalIndicadores';
import { Link } from 'react-router-dom';
import { getNewPathUrl } from '../../hooks/usePathRoute';

function Toolbar() {
  return (
    <div className="flex px-10 pt-6 pb-4 gap-2">
      <Input
        contentBefore={<Search24Regular />}
        placeholder="Buscar.."
        type="search"
      />
      <span className="flex-1"></span>
      <Link to={getNewPathUrl('indicadores/ficha')}>
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
