import { TITULO_ANUARIO } from '../../src/config/constantes';

function Title() {
  return (
    <div className="bg-custom-green w-full py-1 text-center">
      <p className="text-white font-semibold">{TITULO_ANUARIO.toUpperCase()}</p>
    </div>
  );
}

export default Title;
