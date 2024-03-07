import React, { useEffect, useState } from 'react';
import {
  ChevronRight24Filled,
  ChevronDown24Filled,
} from '@fluentui/react-icons';
import { getQueryParam, newPathUrl } from '../../src/utils/url-utils';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  selectClaficadorNivel1Activo,
  selectClasificadoresDesdeNivel2,
  selectComponenteIndicePath,
} from '../app/AppSlice';
import { Clasificador } from '../types/Clasificador';
import { deepClone } from '../../src/utils/object-utils';

function NabAside() {
  const [openSubMenu, setOpenSubMenu] = useState({});
  let indice = useAppSelector(selectClasificadoresDesdeNivel2);
  let clasificadorNivel1Activo = useAppSelector(selectClaficadorNivel1Activo);
  indice = deepClone(indice);
  indice = indice.map((item) => {
    item.expanded = false;
    if (
      item.numeral.split('.').length === 2 &&
      item.numeral.split('.')[0] === clasificadorNivel1Activo
    ) {
      item.visible = true;
    } else {
      item.visible = false;
    }
    return item;
  });
  const numItemActivo = useAppSelector(selectComponenteIndicePath);
  const location = useLocation();
  const resourceId = getQueryParam(location, 'estadistica') || 1;

  console.log(resourceId);

  const toggleMenu = (id) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderSubMenuItems = (subItems: Clasificador[], parentId) => {
    return (
      <ul className="list-none pl-4 flex flex-col">
        {subItems.map((subItem) => (
          <li key={subItem.id} className="my-custom-pad">
            <button
              onClick={() => toggleMenu(subItem.numeral)}
              className="flex items-start justify-start border-none p-0 appearance-none cursor-pointer no-underline hover:text-custom-blue focus:outline-none bg-gray-100 gap-1"
            >
              <div className="hover:text-custom-blue flex items-center justify-center">
                {openSubMenu[subItem.numeral] ? (
                  <ChevronDown24Filled
                    style={{ width: '16px', height: '16px' }}
                  />
                ) : (
                  <ChevronRight24Filled
                    style={{ width: '16px', height: '16px' }}
                  />
                )}
              </div>
              <Link
                to={newPathUrl(location, 'estadistica', subItem.numeral + '.1')}
                className="no-underline text-black hover:text-custom-blue text-xs flex gap-custom-pad items-start justify-center"
              >
                <div>{subItem.numeral}</div>
                <div className="text-start">{subItem.nombre}</div>
              </Link>
            </button>
            <ul></ul>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-gray-100 p-3  h-full border-x-0 border-b-0 border-t-4 border-t-custom-blue border-solid">
      <ul className="list-none flex flex-col pl-0 my-0">
        {indice.map((item, index) => {
          if (!item.visible) {
            return null;
          }
          return (
            <li key={item.numeral} className="my-custom-pad">
              <button
                onClick={() => toggleMenu(item.numeral)}
                className="flex items-start justify-start border-none p-0 appearance-none cursor-pointer no-underline hover:text-custom-blue focus:outline-none bg-gray-100 gap-1"
              >
                <div className="hover:text-custom-blue flex items-center justify-center">
                  {openSubMenu[item.numeral] ? (
                    <ChevronDown24Filled
                      style={{ width: '16px', height: '16px' }}
                    />
                  ) : (
                    <ChevronRight24Filled
                      style={{ width: '16px', height: '16px' }}
                    />
                  )}
                </div>
                <Link
                  className="no-underline text-black hover:text-custom-blue text-xs flex gap-custom-pad items-start justify-center"
                  to={newPathUrl(
                    location,
                    'estadistica',
                    item.numeral + '.1.1'
                  )}
                >
                  <div>{item.numeral}</div>
                  <div className="text-start">{item.nombre}</div>
                </Link>
              </button>
              {/* {openSubMenu[item.numeral] &&
                renderSubMenuItems(item.hijos, item.id)} */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default NabAside;
