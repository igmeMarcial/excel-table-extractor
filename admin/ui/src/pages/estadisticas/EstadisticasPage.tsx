import MainLayout from '../../layout/MainLayout';
import EstadisticasPageList from './EstadisticasPageList';
import EstadisticasPageToolbar from './EstadisticasPageToolbar';

const EstadisticasPage = () => {
  return (
    <MainLayout>
      <EstadisticasPageToolbar />
      <EstadisticasPageList />
    </MainLayout>
  );
};

export default EstadisticasPage;
