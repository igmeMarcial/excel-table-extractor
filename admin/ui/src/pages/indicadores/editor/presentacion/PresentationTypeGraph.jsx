import React from 'react';
import { Button } from '@fluentui/react-components';
import { ArrowTrendingLines24Filled } from '@fluentui/react-icons';
function PresentationTypeGraph() {
  return (
    <div>
      <p>Tipo de gráfico</p>
      <div>
        <Button icon={<ArrowTrendingLines24Filled />} />
        <Button icon={<ArrowTrendingLines24Filled />} />
        <Button icon={<ArrowTrendingLines24Filled />} />
        <Button icon={<ArrowTrendingLines24Filled />} />
        <Button icon={<ArrowTrendingLines24Filled />} />
      </div>
    </div>
  );
}

export default PresentationTypeGraph;
