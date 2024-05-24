import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
} from '@fluentui/react-components';
import { MoreVerticalRegular, Add24Filled } from '@fluentui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import EstadisticasPageToolbarImportButton from './EstadisticasPageToolbarImportButton';
import SearchBox from '../../components/SearchBox';
import { builNavPathUrl } from '../../utils/url-utils';
import { ChangeEvent } from 'react';

interface EstadisticasPageToolbarProps {
  onSearchBoxChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function EstadisticasPageToolbar({
  onSearchBoxChange,
}: Readonly<EstadisticasPageToolbarProps>) {
  const location = useLocation();
  const handlerSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onSearchBoxChange) {
      onSearchBoxChange(event);
    }
  };
  return (
    <div className="flex px-10 pt-6 pb-4 gap-2">
      <SearchBox onChange={handlerSearchChange} />
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
