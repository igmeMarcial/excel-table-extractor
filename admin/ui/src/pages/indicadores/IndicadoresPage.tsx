import MainLayout from '../../layout/MainLayout';
import IndicadoresPageList from './IndicadoresPageList';
import IndicadoresPageToolbar from './IndicadoresPageToolbar';

const IndicadoresPage = () => {
  return (
    <MainLayout>
      <IndicadoresPageToolbar />
      <IndicadoresPageList />
    </MainLayout>
  );
};

export default IndicadoresPage;
