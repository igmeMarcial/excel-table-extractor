import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavPna from '../components/PrimaryNavPna';
import PageTitle from '../components/PageTitle';
import { TEXTO_PNA } from '../../src/config/textos';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';
import PageDescription from '../components/PageDescription';
const imgPath = window.AesaInfo.pluginUrl + '/public/assets/images/mdea-banner.png';
export default function VistaEstadisticaPna({
  estadistica,
}: Readonly<VistaEstadisticaProps>) {
  const descripcion =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit bibendum lorem vel ullamcorper. Quisque eu nisl at urna rhoncus lacinia vitae eu nisl. Ut dapibus mattis molestie. Maecenas eget mauris non nulla condimentum fermentum quis vel arcu. Nulla ac mi dictum, faucibus ipsum quis, fringilla massa. Sed vestibulum libero felis, non tristique mi ultricies eget. Praesent ut massa leo. Proin tristique vestibulum nisi ut laoreet. Phasellus purus leo, varius eu cursus id, placerat in nisl. Curabitur pellentesque euismod ante, id semper nunc consectetur quis. Vestibulum placerat aliquam nisi vitae tincidunt. Cras pellentesque magna sed pharetra ullamcorper. Donec et suscipit erat. Nunc consequat cursus metus nec aliquam.';
  return (
    <>
      <MarcoOrdenadorNav />
      <PageDescription
        text={descripcion}
        title={'Estadísticas relacionadas con los ' + TEXTO_PNA}
        img={imgPath}
      />
    </>
  );
}
