import React from 'react';

function PrimaryNavOcde({ items }) {
  return (
    <div className="flex justify-between flex-wrap mt-5 mb-5">
      {items.map((item, index) => (
        <div
          key={item.color}
          className={` min-h-16 p-2 rounded-lg text-center`}
          style={{
            backgroundColor: item.color,
            width: 'calc(11.1111% - ( 0.83333333333333 * 30px ) )',
          }}
        >
          <span className="text-xs text-white">{item?.titulo}</span>
        </div>
      ))}
    </div>
  );
}

export default PrimaryNavOcde;
