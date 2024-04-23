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
import { useEffect, useState } from 'react';

interface MenuItemProps {
  model: IndiceItem;
  onExpandToggleClick: (model: IndiceItem) => void;
}
// http://192.168.18.2:3001/?marcoOrdenador=mdea&estadistica=1.1.1.1&eid=2&tab=datos

const MenuItem = ({ model, onExpandToggleClick }: MenuItemProps) => {
  // No visible
  if (!model.visible) {
    return null;
  }

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
