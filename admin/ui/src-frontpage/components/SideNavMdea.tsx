import { ChevronUp24Filled, ChevronDown24Filled,CaretRight24Regular,CaretDown24Filled   } from '@fluentui/react-icons';
import { getQueryParam, newPathUrl } from '../../src/utils/url-utils';
import { Link, useLocation } from 'react-router-dom';
import { IndiceItem } from '../types/IndiceItem';
import { QUERY_PARAM_ESTADISTICA_ID } from '../../src/core/constantes';
import { IndiceEstadisticas } from '../../src/core/IndiceEstadisticas';
import { useIndiceItemNivel1Seleccionado } from '../../src/hooks/url-hooks';
import { useEffect, useState } from 'react';

interface MenuItemProps {
  model: IndiceItem;
  onExpandToggleClick: (model: IndiceItem) => void;
}

const ExpandedArrow = ({ model }) => {
  const style: React.CSSProperties = {
    width: '15px',
    height: '15px',
    right: '-5px',
position:'absolute',
    top: '3px',
    boxSizing: 'content-box',
    paddingRight: '5px',
  };
  if (!model.hasChildren) {
    return null;
  }
  if (model.expanded) {
    return <CaretRight24Regular style={style} />;
  }
  return <CaretDown24Filled style={style} />;
};
const MenuItem = ({ model, onExpandToggleClick }: MenuItemProps) => {
  // No visible
  const getPaddingLeft = (nivel: number) => {
    switch (nivel) {
      case 1:
        return '10px';
      case 2:
        return '20px';
      case 3:
        return '38px';
      default:
        return '10px';
    }
  };
  console.log(model)
  if (!model.visible) {
    return null;
  }



  // Estadistica
  const location = useLocation();
  if (!model.estadisticaId) {
    return (
      <div
        style={{
          color: model.expanded === true ? 'rgb(52, 90, 145)' : 'black',
          paddingLeft:getPaddingLeft(model?.nivel)
        }}
        className="min-h-6 cursor-pointer   pr-10  py-1 font-semibold hover:bg-gray-200 flex"
        onClick={() => {
          onExpandToggleClick(model);
        }}
      >
       <span className='inline-block relative'><ExpandedArrow model={model}/></span>
        <span className="text-[13px]">{model.nombre}</span>
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
interface SideNavMdeaProps {
  indiceEstadisticas: IndiceEstadisticas;
}
function SideNavMdea({ indiceEstadisticas }: SideNavMdeaProps) {
  const nivel1 = useIndiceItemNivel1Seleccionado();
  const [menuItems, setMenuItems] = useState(
    indiceEstadisticas.getItemsForSideNav(indiceEstadisticas.getItems(), nivel1)
  );

  const toggleMenu = (model) => {
    const { numeral, expanded, nivel } = model;
    const doExpand = !expanded;
    const newindice = menuItems.map((item) => {
      //Invertir toggle expander
      if (item.numeral === numeral) {
        item.expanded = !item.expanded;
      }
      //Hijos directos e indirectos
      if (item.nivel > nivel && item.numeral.startsWith(numeral)) {
        if (item.nivel === nivel + 1) {
          item.visible = doExpand;
        }
        if (item.nivel > nivel + 1 && !doExpand) {
          item.visible = false;
        }
      }
      return item;
    });
    setMenuItems(newindice);
  };
  useEffect(() => {
    setMenuItems(indiceEstadisticas.getItemsForSideNav(menuItems, nivel1));
  }, [nivel1]);
  return (
    <div className="py-3 border-x-0 border-b-0 ">
      <div className="flex flex-col pl-0 my-0">
        {menuItems.map((item, index) => (
          <MenuItem key={index} model={item} onExpandToggleClick={toggleMenu} />
        ))}
      </div>
    </div>
  );
}
export default SideNavMdea;
