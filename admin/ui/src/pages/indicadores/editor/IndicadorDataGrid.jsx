import React from 'react';

function IndicadorDataGrid({ data }) {
  return (
    // <div className="border border-gray-200 h-60 bg-custom-grey">es table</div>
    <div className="flex flex-col w-full border-t border-r border-black border-solid">
      <div className="flex flex-shrink-0 bg-custom-blue text-white">
        {data[0].map((heading, index) => (
          <div
            key={heading}
            className="flex items-center flex-grow w-0 h-5 px-2 border-b border-l border-gray-950 border-solid"
          >
            <span className="text-xs">{heading}</span>
          </div>
        ))}
      </div>
      <div className="overflow-auto">
        {data.slice(1, -1).map((itemRow, rowIndex) => (
          <div key={`${itemRow}-${rowIndex}`} className="flex flex-shrink-0">
            {itemRow.map((item, colIndex) => (
              <div
                key={item}
                className="flex items-center flex-grow w-0 h-5 px-2 border-b border-l border-black border-solid"
              >
                <span className="text-xs">{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-shrink-0 bg-custom-blue text-white">
        {data[data.length - 1].map((footer, index) => (
          <div
            key={footer}
            className="flex items-center flex-grow w-0 h-5 px-2 border-b border-l border-black border-solid"
          >
            <span className="text-xs">{footer}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndicadorDataGrid;
