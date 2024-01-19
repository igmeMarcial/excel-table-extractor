import React from 'react'

function FilesIndicadoresCell({arr}) {
  return (
    <div className="h-full ">
      <div className="bg-gray-100 py-2 px-4">
        <h2 className="text-xl font-semibold text-gray-800">Indicadores:</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {arr && arr.length > 0 ? (
          arr.map((item, index) => (
            <li
              key={index}
              className="mb-0 flex items-center py-2 px-6 border-l border-r"
            >
              <div className="flex-1">
                <h5 className="text-sm font-medium text-gray-800">{item}</h5>
              </div>
            </li>
          ))
        ) : (
          <li className="mb-0 flex items-center py-2 px-6 border-l border-r">
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                No hay indicadores disponibles.
              </p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default FilesIndicadoresCell