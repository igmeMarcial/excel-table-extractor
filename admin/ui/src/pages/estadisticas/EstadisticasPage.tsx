import { useRef } from 'react';
import MainLayout from '../../layout/MainLayout';
import EstadisticasPageList from './EstadisticasPageList';
import EstadisticasPageToolbar from './EstadisticasPageToolbar';

const EstadisticasPage = () => {
  const listRef = useRef(null);
  const handleSearchBoxChange = (value) => {
    listRef.current.filterRecords(value);
  };
  return (
    <MainLayout>
      <EstadisticasPageToolbar onSearchBoxChange={handleSearchBoxChange} />
      <EstadisticasPageList ref={listRef} />
    </MainLayout>
  );
};

export default EstadisticasPage;
