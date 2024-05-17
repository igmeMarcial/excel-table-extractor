import { ChevronUp24Filled, ChevronDown24Filled } from '@fluentui/react-icons';
import { getQueryParam, newPathUrl } from '../../src/utils/url-utils';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectMenuNivel2, toggleMenuNivel2Item } from '../app/AppSlice';
import { IndiceItem } from '../types/IndiceItem';
import {
  QUERY_PARAM_ESTADISTICA_ID,
  QUERY_PARAM_ESTADISTICA_INDICE_PATH,
} from '../../src/core/constantes';

interface MenuItemProps {
  model: IndiceItem;
  onExpandToggleClick: (model: IndiceItem) => void;
}

const ExpandedArrow = ({ model }) => {
  const style: React.CSSProperties = {
    width: '20px',
    height: '20px',
    right: '0px',
    position: 'absolute',
    top: '5px',
    boxSizing: 'content-box',
    paddingRight: '12px',
  };
  if (!model.hasChildren) {
    return null;
  }
  if (model.expanded) {
    return <ChevronDown24Filled style={style} />;
  }
  return <ChevronUp24Filled style={style} />;
};
const MenuItem = ({ model, onExpandToggleClick }: MenuItemProps) => {
  // No visible
  if (!model.visible) {
    return null;
  }

  // Estadistica
  const location = useLocation();
  const paramValueNav = getQueryParam(
    location,
    QUERY_PARAM_ESTADISTICA_INDICE_PATH
  );
  if (!model.estadisticaId) {
    return (
      <div
        style={{
          color: model.expanded === true ? '#be1a1a' : 'black',
        }}
        className="min-h-6 cursor-pointer relative pl-12 pr-10  py-1 font-semibold hover:bg-gray-200"
        onClick={() => {
          onExpandToggleClick(model);
        }}
      >
        <span className="absolute left-0 pl-3 text-[13px]">
          {model.numeral}
        </span>
        <span className="text-[13px]">{model.nombre}</span>
        <ExpandedArrow model={model} />
      </div>
    );
  }
  let paramValue = getQueryParam(location, QUERY_PARAM_ESTADISTICA_ID) || '1';
  return (
    <Link
      style={{
        color: String(model.estadisticaId) === paramValue ? '#0F6CBD' : 'black',
      }}
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
    <div className="py-3 border-x-0 border-b-0 border-t-4 border-t-custom-blue border-solid">
      <div className="flex flex-col pl-0 my-0">
        {menuNivel2.map((item, index) => (
          <MenuItem key={index} model={item} onExpandToggleClick={toggleMenu} />
        ))}
      </div>
    </div>
  );
}
export default NabAside;
