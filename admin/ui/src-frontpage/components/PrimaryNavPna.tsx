import React from 'react';
import { LINIAMIENTOS_POLITICA } from '../../src/config/colors';

function PrimaryNavPna() {
  const items = LINIAMIENTOS_POLITICA;
  return (
    <div className="flex justify-between flex-wrap mt-5 mb-5">
      {items.map((item, index) => (
        <div
          key={item.color}
          className={` min-h-16 p-2 rounded-lg text-center  text-white content-center`}
          style={{
            backgroundColor: item.color,
            width: 'calc(11.1111% - ( 0.83333333333333 * 30px ) )',
            fontSize: '10px',
            lineHeight: '0.8rem',
          }}
        >
          {item?.titulo}
        </div>
      ))}
    </div>
  );
}

export default PrimaryNavPna;
