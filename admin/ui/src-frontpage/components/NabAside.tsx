import React, { useState } from 'react';

import {
  IosArrowRtl24Filled,
  ChevronDown24Filled,
} from '@fluentui/react-icons';
function NabAside() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-300 w-full ">
      <ul className="main">
        <li>
          <div onClick={toggleMenu} className="menu-item">
            {isOpen ? <IosArrowRtl24Filled /> : <ChevronDown24Filled />}
            1.1 Condiciones Físicas
          </div>
          {isOpen && (
            <ul className="submenu">
              <li>Atmósfera, Clima y Condiciones Meteorológicas</li>
              <li>Características Hidrográficas</li>
            </ul>
          )}
        </li>
        <li>
            
        </li>
      </ul>
    </div>
  );
}

export default NabAside;
