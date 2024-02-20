import React from 'react';

interface IndicatorEditorTabPresentationRightProps{
  tyGraph: string;
}
const IndicatorEditorTabPresentationRight: React.FC<IndicatorEditorTabPresentationRightProps> = ({tyGraph}) => {
  return (
    <div className="border border-yellow-200 w-full h-96">
      <p>{tyGraph && tyGraph}</p>
      <div className="border border-gray-400 w-full h-56 solid bg-gray-100">
        
      </div>
    </div>
  );
}

export default IndicatorEditorTabPresentationRight;
