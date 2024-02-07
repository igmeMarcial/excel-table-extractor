import React from 'react';
import PresentationSeriesConfigurationList from './PresentationSeriesConfigurationList';

function PresentationSeriesConfiguration() {
  return (
    <div>
      <p>Configuracion de series</p>
      <div className="w-11/12 bg-white rounded-lg  my-5 ">
        <div className="flex-1 ">
          <PresentationSeriesConfigurationList />
          <PresentationSeriesConfigurationList />
          <PresentationSeriesConfigurationList />
        </div>
      </div>
    </div>
  );
}

export default PresentationSeriesConfiguration;
