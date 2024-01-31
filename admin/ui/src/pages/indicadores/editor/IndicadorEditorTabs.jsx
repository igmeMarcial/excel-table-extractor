import React, { useRef } from 'react';
import { Tabs } from 'antd';
import IndicadorEditorTabFicha from './IndicadorEditorTabFicha';
import IndicadorEditorTabDatos from './IndicadorEditorTabDatos';
import IndicadorEditorTabPresentacion from './IndicadorEditorTabPresentacion';

function IndicadorEditorTabs({ formData, onChange, onSubmit }) {
  const tabFichaRef = useRef();

  const handleSubmitTabFicha = () => {
    // la función de handleSubmit en IndicadorEditorTabFicha
    tabFichaRef.current.handleSubmit();
    //  la función de onSubmit en el componente padre
    console.log(tabFichaRef.current);
    onSubmit();
  };

  const items = [
    {
      key: '1',
      label: 'Ficha',
      children: (
        <IndicadorEditorTabFicha
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
          ref={tabFichaRef}
        />
      ),
    },
    {
      key: '2',
      label: 'Datos',
      children: <IndicadorEditorTabDatos />,
    },
    {
      key: '3',
      label: 'Presentación',
      children: <IndicadorEditorTabPresentacion />,
    },
  ];

  const onChangeTab = (key) => {
    console.log(key);
  };
  return <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />;
}

export default IndicadorEditorTabs;
