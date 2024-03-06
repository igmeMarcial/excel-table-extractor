import React, { useEffect, useState } from 'react';
import {
  ChevronRight24Filled,
  ChevronDown24Filled,
} from '@fluentui/react-icons';
import { getQueryParam, newPathUrl } from '../../src/utils/url-utils';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  selectComponenteIndicePath,
  selectIndiceEstadisticas,
} from '../app/AppSlice';

function NabAside() {
  const [openSubMenu, setOpenSubMenu] = useState({});
  const [selectChilds, setSelectChild] = useState(null);
  const indiceEstadisticas = useAppSelector(selectIndiceEstadisticas);
  const numItemActivo = useAppSelector(selectComponenteIndicePath);
  const location = useLocation();
  const resourceId = getQueryParam(location, 'estadistica') || 1;

  console.log(resourceId);
  useEffect(() => {
    const node = indiceEstadisticas.find(
      (item) => item.id === Number(numItemActivo)
    );
    if (node) {
      setSelectChild(node?.hijos);
    } else {
      setSelectChild([]);
    }
  }, [indiceEstadisticas, numItemActivo]);

  const toggleMenu = (id) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderSubMenuItems = (subItems, parentId) => {
    return (
      <ul className="list-none pl-4 flex flex-col">
        {subItems.map((subItem) => (
          <li key={subItem.id} className="my-custom-pad">
            <button
              onClick={() => toggleMenu(subItem.numeracion)}
              className="flex items-start justify-start border-none p-0 appearance-none cursor-pointer no-underline hover:text-custom-blue focus:outline-none bg-gray-100 gap-1"
            >
              <div className="hover:text-custom-blue flex items-center justify-center">
                {openSubMenu[subItem.numeracion] ? (
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
                to={newPathUrl(
                  location,
                  'estadistica',
                  subItem.numeracion + '.1'
                )}
                className="no-underline text-black hover:text-custom-blue text-xs flex gap-custom-pad items-start justify-center"
              >
                <div>{subItem.numeracion}</div>
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
        {selectChilds ? (
          selectChilds.map((item, index) => (
            <li key={item.id} className="my-custom-pad">
              <button
                onClick={() => toggleMenu(item.numeracion)}
                className="flex items-start justify-start border-none p-0 appearance-none cursor-pointer no-underline hover:text-custom-blue focus:outline-none bg-gray-100 gap-1"
              >
                <div className="hover:text-custom-blue flex items-center justify-center">
                  {openSubMenu[item.numeracion] ? (
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
                    item.numeracion + '.1.1'
                  )}
                >
                  <div>{item.numeracion}</div>
                  <div className="text-start">{item.nombre}</div>
                </Link>
              </button>
              {openSubMenu[item.numeracion] &&
                renderSubMenuItems(item.hijos, item.id)}
            </li>
          ))
        ) : (
          <li>Cargando...</li>
        )}
      </ul>
    </div>
  );
}
export default NabAside;
