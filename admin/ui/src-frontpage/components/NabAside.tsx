import React, { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';
import {
  ChevronRight24Filled,
  ChevronDown24Filled,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: { 
    width:'12px',
  height:'12px' },
});


function NabAside() {
  const [openSubMenu, setOpenSubMenu] = useState({});
const classes = useStyles();
  const toggleMenu = (index) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  
  

  const menuItems = [
    {
      id: 1,
      title: '1.1 Condiciones Físicas',
      subItems: [
        {
          id: 22,
          title: '1.1.1 Atmósfera, Clima y Condiciones Meteorológicas',
          subItems: ['1.1.1.1 Radiación ultravioleta, promedio mensual, anual y máximo mensual y anual en los Distritos de San Martin de Porres, Carabayllo, Ate (Ceres) de la Provincia de Lima, 2023 (IUV)', '1.1.1.2 Radiación ultravioleta, promedio mensual, anual y máximo mensual y anual según principales provincias y departamentos, 2023 (IUV)'],
        },
        {
          id: 23,
          title: '1.1.2 Características Hidrográficas',
          subItems: ['1.1.2.1 Subitem 1', '1.1.2.2 Subitem 2'],
        },
         {
          id: 24,
          title: 'Información geológica y geográfica',
          subItems: ['1.1.2.1 Subitem 1', '1.1.2.2 Subitem 2'],
        },
         {
          id: 25,
          title: 'Características del suelo',
          subItems: ['1.1.2.1 Subitem 1', '1.1.2.2 Subitem 2'],
        },
      ],
    },
    {
      id: 2,
      title: '1.2 Cobertura Terrestre, Ecosistemas y Biodiversidad',
      subItems: [
        {
          id: 15,
          title: '1.1.1 Atmósfera, Clima y Condiciones Meteorológicas',
          subItems: ['1.1.1.1 Subitem 1', '1.1.1.2 Subitem 2'],
        },
        {
          id: 16,
          title: '1.1.2 Características Hidrográficas',
          subItems: ['1.1.2.1 Subitem 1', '1.1.2.2 Subitem 2'],
        },
      ],
    },
    {
      id: 3,
      title: '1.3 Calidad Ambiental',
      subItems: [
        {
          id: 13,
          title: '1.1.1 Atmósfera, Clima y Condiciones Meteorológicas',
          subItems: ['1.1.1.1 Subitem 1', '1.1.1.2 Subitem 2'],
        },
        {
          id: 14,
          title: '1.1.2 Características Hidrográficas',
          subItems: ['1.1.2.1 Subitem 1', '1.1.2.2 Subitem 2'],
        },
      ],
    },
    // Agrega más elementos aquí según sea necesario
  ];

  const renderSubMenuItems = (subItems, parentId) => {
  return (
    <ul className="list-none pl-6">
      {subItems.map((subItem) => (
        <li key={subItem.id}>
          <button
            onClick={() => toggleMenu(subItem.id)}
            className="flex items-center justify-start border-none p-0 appearance-none cursor-pointer no-underline hover:text-custom-blue focus:outline-none bg-gray-100"
          >
            {Array.isArray(subItem.subItems) ? (
              openSubMenu[subItem.id] ? (
                <ChevronDown24Filled />
              ) : (
                <ChevronRight24Filled />
              )
            ) : (
              <span className="mr-2"/>
            )}
            <p className='text-xs text-start'>{subItem.title}</p>
          </button>
          {Array.isArray(subItem.subItems) && openSubMenu[subItem.id] && (
            <ul className="list-none pl-6">
              {subItem.subItems.map((subSubItem, subIndex) => (
                <li key={`${subItem.id}-${subIndex}`}>
                  <button className='text-xs border-none p-0 appearance-none cursor-pointer no-underline hover:text-custom-blue focus:outline-none bg-gray-100'><p className='text-start'>{subSubItem}</p></button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

  return (
    <div className="bg-gray-100  p-2 my-3">
      <ul className="list-none flex flex-col pl-0 gap-2">
        {menuItems.map((item, index) => (
          <li key={item.id} >
            <button
              onClick={() => toggleMenu(item.id)}
              className="flex items-center justify-start border-none p-0 appearance-none cursor-pointer no-underline hover:text-custom-blue focus:outline-none bg-gray-100 "
            >
              {openSubMenu[item.id] ? (
                <ChevronRight24Filled />
              ) : (
                <ChevronDown24Filled />
              )}
              <p className='text-xs'>{item.title}</p>
            </button>
            {item.subItems &&
              openSubMenu[item.id] &&
              renderSubMenuItems(item.subItems, item.id)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NabAside;
