import { Button } from '@fluentui/react-components';
export default function Status404Pages() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600">Página no encontrada</p>
      <p>Lo sentimos, la página que está buscando no pudo ser encotrada.</p>
      <Button>SALIR DE AQUI</Button>
    </div>
  );
}
