import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavMdea from '../components/PrimaryNavMdea';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';
import SideNavMdea from '../components/SideNavMdea';
import PageDescription from '../components/PageDescription';
import { TEXTO_MDEA } from '../../src/config/textos';

export default function VistaEstadisticaMdea({
  estadistica,
  indiceEstadisticas,
}: Readonly<VistaEstadisticaProps>) {
  const descripcion =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit bibendum lorem vel ullamcorper. Quisque eu nisl at urna rhoncus lacinia vitae eu nisl. Ut dapibus mattis molestie. Maecenas eget mauris non nulla condimentum fermentum quis vel arcu. Nulla ac mi dictum, faucibus ipsum quis, fringilla massa. Sed vestibulum libero felis, non tristique mi ultricies eget. Praesent ut massa leo. Proin tristique vestibulum nisi ut laoreet. Phasellus purus leo, varius eu cursus id, placerat in nisl. Curabitur pellentesque euismod ante, id semper nunc consectetur quis. Vestibulum placerat aliquam nisi vitae tincidunt. Cras pellentesque magna sed pharetra ullamcorper. Donec et suscipit erat. Nunc consequat cursus metus nec aliquam.';
  return (
    <>
      <MarcoOrdenadorNav />{' '}
      <PageDescription
        text={descripcion}
        title={'Estadísticas relacionadas con el ' + TEXTO_MDEA}
      />
      <PrimaryNavMdea items={indiceEstadisticas.getItemsNivel1()} />
      <div className="flex sm:flex-col-reverse md:flex-row">
        <div style={{ width: '300px' }} className="bg-gray-100">
          <SideNavMdea indiceEstadisticas={indiceEstadisticas} />
        </div>
        <div className="flex-1 overflow-hidden ">
          <EstadisticaVistaTabs estadistica={estadistica} />
        </div>
      </div>
    </>
  );
}
