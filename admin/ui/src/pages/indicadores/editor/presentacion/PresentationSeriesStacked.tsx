import React from 'react';
import { Switch } from '@fluentui/react-components';

const PresentationSeriesStacked: React.FC = () => {
  return (
    <div className="flex">
      <p>Series apiladas</p>
      <Switch label="No" />
    </div>
  );
};

export default PresentationSeriesStacked;
