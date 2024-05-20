import { Button } from '@fluentui/react-components';
export default function Status500Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">500</h1>
      <p className="text-gray-600">Estadistica no encontrada</p>
      <p>Lo sentimos, la página que está buscando no pudo ser encotrada.</p>
      <Button>SALIR DE AQUI</Button>
    </div>
  );
}
