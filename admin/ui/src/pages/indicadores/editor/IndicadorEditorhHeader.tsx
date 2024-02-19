import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {
  ArrowCurveDownLeft24Regular,
} from '@fluentui/react-icons';
import IndicadorEditorModalImport from './IndicadorEditorModalImport';

interface Estadistica {
  nombre?: string;
}
interface IndicadorEditorhHeaderProps {
  estadistica?: Estadistica;
  onTableData?:any;
  onIndicatorData?: any;
  setTabActiveKey: (newKey: string) => void;

}

const IndicadorEditorhHeader: React.FC<IndicadorEditorhHeaderProps> = ({estadistica = { nombre: 'Nombre indicador...' },onTableData, onIndicatorData,setTabActiveKey
}) => { 

  const handleTableData =(values)=>{
    onTableData(values)
  }
  const handleIndicatorData = (values)=>{
    onIndicatorData(values) 
  }
  return (
    <>
      <div className="bg-custom-grey flex px-12 pt-3 pb-3 gap-2 items-center">
        <p className="text-2xl md:text-2xl font-bold p-0 m-1">Indicador</p>
        <span className="flex-1"></span>
        <IndicadorEditorModalImport setTabActiveKey={setTabActiveKey} onTableData={handleTableData} onIndicatorData={handleIndicatorData}/>
        <Button
          type="text"
          style={{ color: '#2271B1' }}
          icon={
            <ArrowCurveDownLeft24Regular
              className="w-5 align-middle"
              style={{ color: '#DA3B01' }}
            />
          }
        >
          Descartar cambios
        </Button>
      </div>
      <p className="block bg-custom-grey m-0 px-12 font-semibold text-sm pb-3 truncate">
        {estadistica.nombre || 'Nombre indicador...'}
      </p>
    </>
  );
}

IndicadorEditorhHeader.propTypes = {
  estadistica: PropTypes.object,
};
IndicadorEditorhHeader.defaultProps = {
  estadistica: { nombre: 'Nombre indicador...' },
};
export default IndicadorEditorhHeader;
