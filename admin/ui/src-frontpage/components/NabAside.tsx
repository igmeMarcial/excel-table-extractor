import { ChevronUp24Filled, ChevronDown24Filled } from '@fluentui/react-icons';
import { newPathUrl } from '../../src/utils/url-utils';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectMenuNivel2, toggleMenuNivel2Item } from '../app/AppSlice';
import { IndiceItem } from '../types/IndiceItem';

interface MenuItemProps {
  model: IndiceItem;
  onExpandToggleClick: (model: IndiceItem) => void;
}

const MenuItem = ({ model, onExpandToggleClick }: MenuItemProps) => {
  // No visible
  if (!model.visible) {
    return null;
  }
  // Clasficador
  if (!model.estadisticaId) {
    return (
      <div
        className="flex gap-1 justify-between"
        onClick={() => {
          onExpandToggleClick(model);
        }}
      >
        <div className="hover:text-custom-blue text-sm relative pl-11">
          <span className="absolute left-0">{model.numeral}</span>
          {model.nombre}
        </div>
        {model.expanded ? (
          <ChevronDown24Filled style={{ width: '16px', height: '16px' }} />
        ) : (
          <ChevronUp24Filled style={{ width: '16px', height: '16px' }} />
        )}
      </div>
    );
  }
  // Estadistica
  const location = useLocation();
  return (
    <Link
      to={newPathUrl(location, 'eid', model.estadisticaId)}
      className="flex items-start justify-start  bg-gray-100 gap-1 no-underline"
    >
      <div className="hover:text-custom-blue relative pl-11">
        <span className="absolute left-0">{model.numeral}</span>
        {model.nombre}
      </div>
    </Link>
  );
};

function NabAside() {
  const dispath = useAppDispatch();
  const menuNivel2 = useAppSelector(selectMenuNivel2);
  const toggleMenu = (model) => {
    dispath(toggleMenuNivel2Item(model));
  };
  return (
    <div className="bg-gray-100 p-3  h-full border-x-0 border-b-0 border-t-4 border-t-custom-blue border-solid">
      <div className="flex flex-col pl-0 my-0">
        {menuNivel2.map((item, index) => (
          <MenuItem key={index} model={item} onExpandToggleClick={toggleMenu} />
        ))}
      </div>
    </div>
  );
}
export default NabAside;
