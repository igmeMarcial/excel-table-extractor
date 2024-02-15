import React, { useRef, useState } from 'react';
import MainLayout from '../../../layout/MainLayout';
import IndicadorEditorhHeader from './IndicadorEditorhHeader';
import IndicadorEditorTabs from './IndicadorEditorTabs';
import IndicadorEditorBottomActions from './IndicadorEditorBottomActions';

interface Estadistica {
  [key: string]: any; 
}

function IndicadorEditorPage() {
  const [estadistica, setEstadistica] = useState({});
  const [datos,setDatos]=useState({})
  const [tableData,setTableData] = useState([]);

  const handleTabFichaDataChange = (values: Estadistica) => {
    setEstadistica((prevEstadistica) => {
      return { ...prevEstadistica, ...values };
    });
  };
  const handleTabDatosDataChange =(values)=>{
    setDatos((prevDatos)=>{
      return {...prevDatos,...values}
    });
  }
  const handleTabDataChange = (tab: string, values: Estadistica) => {
    if (tab === 'ficha') {
      handleTabFichaDataChange(values);
    }
    if(tab === "datos"){
      handleTabDatosDataChange(values)
    }
  };
  const handleTableData=(values:any)=>{
    setTableData(values)
  }

  return (
    <MainLayout>
      <IndicadorEditorhHeader estadistica={estadistica} onTableData={handleTableData}/>
      <div className="px-12 ">
        <IndicadorEditorTabs onTabDataChange={handleTabDataChange} tableData={tableData}/>
      </div>

      <IndicadorEditorBottomActions datos={datos} estadistica={estadistica} />
    </MainLayout>
  );
}

export default IndicadorEditorPage;
