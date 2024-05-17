import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
} from '@fluentui/react-components';
import { MoreVerticalRegular } from '@fluentui/react-icons';

import { Add24Filled, Search24Regular } from '@fluentui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import EstadisticasPageToolbarImportButton from './EstadisticasPageToolbarImportButton';
import { builNavPathUrl } from '../../utils/url-utils';

function EstadisticasPageToolbar() {
  const location = useLocation();
  return (
    <div className="flex px-10 pt-6 pb-4 gap-2">
      <Input
        contentBefore={<Search24Regular />}
        placeholder="Buscar.."
        type="search"
      />
      <span className="flex-1"></span>
      <EstadisticasPageToolbarImportButton />
      <Link to={builNavPathUrl(location, 'indicador-editor')}>
        <Button
          style={{ color: '#2271B1' }}
          appearance="subtle"
          icon={<Add24Filled />}
        >
          Registrar
        </Button>
      </Link>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Tooltip
            content="Más opciones"
            relationship="label"
            appearance="inverted"
            withArrow
          >
            <MenuButton appearance="subtle" icon={<MoreVerticalRegular />} />
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>...</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
}

export default EstadisticasPageToolbar;
