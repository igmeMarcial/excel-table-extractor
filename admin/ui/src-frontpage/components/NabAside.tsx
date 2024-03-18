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
        className="min-h-6 cursor-pointer relative pl-16 pr-10  py-1 font-semibold hover:bg-gray-200"
        onClick={() => {
          onExpandToggleClick(model);
        }}
      >
        <span className="absolute left-0 pl-3">{model.numeral}</span>
        <span>{model.nombre}</span>

        {model.expanded ? (
          <ChevronDown24Filled
            style={{
              width: '20px',
              height: '20px',
              position: 'absolute',
              right: '0px',
              top: '5px',
              paddingRight: '12px',
            }}
          />
        ) : (
          <ChevronUp24Filled
            style={{
              width: '20px',
              height: '20px',
              position: 'absolute',
              right: '0px',
              top: '5px',
              paddingRight: '12px',
            }}
          />
        )}
      </div>
    );
  }
  // Estadistica
  const location = useLocation();
  return (
    <Link
      to={newPathUrl(location, 'eid', model.estadisticaId)}
      className=" relative bg-gray-100  no-underline  text-black pl-16 pr-4 hover:text-custom-blue py-1"
    >
      {model.nombre}
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
    <div className="bg-gray-100 py-3 border-x-0 border-b-0 border-t-4 border-t-custom-blue border-solid">
      <div className="flex flex-col pl-0 my-0">
        {menuNivel2.map((item, index) => (
          <MenuItem key={index} model={item} onExpandToggleClick={toggleMenu} />
        ))}
      </div>
    </div>
  );
}
export default NabAside;
