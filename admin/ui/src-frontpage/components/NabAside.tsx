import React, { useState } from 'react';

import {
  ChevronRight24Filled,
  ChevronDown24Filled,
} from '@fluentui/react-icons';
function NabAside() {
  const [openSubMenu, setOpenSubMenu] = useState({});

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
        '1.1.1 Atmósfera, Clima y Condiciones Meteorológicas',
        '1.1.2 Características Hidrográficas',
      ],
    },
    {
      id: 2,
      title: '1.2 Cobertura Terrestre, Ecosistemas y Biodiversidad',
      subItems: ['1.2.1 Subitem 1', '1.2.2 Subitem 2'],
    },
    {
      id: 3,
      title: '1.3 Calidad Ambiental',
      subItems: ['1.3.1 Subitem 1', '1.3.2 Subitem 2'],
    },
    // Agrega más elementos aquí según sea necesario
  ];

  return (
    <div className="bg-gray-300  p-2  pt-11">
      <ul className="list-none flex flex-col pl-0">
        {menuItems.map((item, index) => (
          <li key={item.id}>
            <div
              onClick={() => toggleMenu(index)}
              className="flex items-center justify-start"
            >
              {openSubMenu[index] ? (
                <ChevronRight24Filled />
              ) : (
                <ChevronDown24Filled />
              )}
              <p>{item.title}</p>
            </div>
            {openSubMenu[index] && (
              <ul className="list-none">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>{subItem}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NabAside;
