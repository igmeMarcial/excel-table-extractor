import React from 'react';

function PrimaryNavOcde({ items }) {
  return (
    <div className="flex justify-between flex-wrap mt-5 mb-5">
      {items.map((item, index) => (
        <div
          key={item.color}
          className={` min-h-16 p-2 rounded-lg`}
          style={{ backgroundColor: item.color }}
        >
          <span className="text-xs text-white">{item?.titulo}</span>
        </div>
      ))}
    </div>
  );
}

export default PrimaryNavOcde;
