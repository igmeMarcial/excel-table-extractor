import { Button, Input } from '@fluentui/react-components';

import {
  MoreVertical24Filled,
  Add24Filled,
  Search24Regular,
} from '@fluentui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import { builNavPathUrl } from '../../utils/url-utils';
import IndicadorModal from './IndicadorModal';

function IndicadoresPageToolbar() {
  const location = useLocation();
  return (
    <div className="flex px-10 pt-6 pb-4 gap-2">
      <Input
        contentBefore={<Search24Regular />}
        placeholder="Buscar.."
        type="search"
      />
      <span className="flex-1"></span>
      <Link to={builNavPathUrl(location, 'indicador-editor')}>
        <Button
          style={{ color: '#2271B1' }}
          appearance="subtle"
          icon={<Add24Filled />}
        >
          Registrar
        </Button>
      </Link>
      <IndicadorModal />
      <Button appearance="subtle" icon={<MoreVertical24Filled />}></Button>
    </div>
  );
}

export default IndicadoresPageToolbar;
