import React, {useState } from 'react';
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
  const [indicadorData,setIndicadorData]= useState([]);
  const [tabActiveKey,setTabActiveKey] = useState("1")

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
  const handleIndicatorData=(values : any)=>[
    setIndicadorData(values)
    
  ]
  
  return (
    <MainLayout>
      <IndicadorEditorhHeader setTabActiveKey={setTabActiveKey} estadistica={estadistica} onTableData={handleTableData} onIndicatorData={handleIndicatorData}/>
      <div className="px-12 ">
        <IndicadorEditorTabs setTabActiveKey={setTabActiveKey} tabActiveKey={tabActiveKey} onTabDataChange={handleTabDataChange} tableData={tableData} indicatorData={indicadorData}/>
      </div>

      <IndicadorEditorBottomActions datos={datos} estadistica={estadistica} />
    </MainLayout>
  );
}

export default IndicadorEditorPage;
