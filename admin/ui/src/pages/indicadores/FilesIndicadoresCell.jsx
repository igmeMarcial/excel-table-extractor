import React from 'react'

function FilesIndicadoresCell({arr}) {
  return (
    <div className="h-full ">
      <div className="bg-gray-100 py-2 px-4">
        <h2 className="text-xl font-semibold text-gray-800">Indicadores</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        <li className="flex items-center py-4 px-6">
          <span className="text-gray-700 text-lg font-medium mr-4">1.</span>
         
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">Indicador</h3>
            
          </div>
        </li>
        <li className="flex items-center py-4 px-6">
          <span className="text-gray-700 text-lg font-medium mr-4">2.</span>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">Indicador</h3>
            
          </div>
        </li>
        <li className="flex items-center py-4 px-6">
          <span className="text-gray-700 text-lg font-medium mr-4">3.</span>
         
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">
              Indicador
            </h3>
            
          </div>
        </li>
        <li className="flex items-center py-4 px-6">
          <span className="text-gray-700 text-lg font-medium mr-4">4.</span>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">Indicadorn</h3>
           
          </div>
        </li>
        <li className="flex items-center py-4 px-6">
          <span className="text-gray-700 text-lg font-medium mr-4">5.</span>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">Indicador</h3>
            
          </div>
        </li>
      </ul>
    </div>
  );
}

export default FilesIndicadoresCell