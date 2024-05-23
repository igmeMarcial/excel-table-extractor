import { IndiceItem } from '../types/IndiceItem';
import { Link, useLocation } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { COLORES_MDEA } from '../../src/config/colors';
import { QUERY_PARAM_SELECTED_INDICE_ITEM_NIVEL_1 } from '../../src/core/constantes';
import { useIndiceItemNivel1Seleccionado } from '../../src/hooks/url-hooks';
interface NavItemProps {
  numeral: string;
  nombre: string;
  active: string;
}

const pathRoot = window.AesaInfo.pluginUrl;
const imgBasePath = pathRoot + '/public/assets/images/mdea';

const NavItem = ({ numeral, nombre, active }: NavItemProps) => {
  const location = useLocation();
  const colors = COLORES_MDEA;
  const linkTo = newPathUrl(
    location,
    QUERY_PARAM_SELECTED_INDICE_ITEM_NIVEL_1,
    numeral
  );
  return (
    <div className="">
      <Link
        key={numeral}
        to={linkTo}
        className={`p-2 rounded-lg mb-1 min-h-16 max-h-[100px] h-full justify-center text-center items-center cursor-pointer no-underline flex flex-col`}
        style={{ backgroundColor: colors[numeral] }}
      >
        <div>
          <img
            alt=""
            className="w-[52px]"
            src={`${imgBasePath}/C0${numeral}.svg`}
          />
        </div>
        <h4 className="content-center h-2/3 font-normal text-white text-xm md:text-sm leading-3 sm:leading-5 md:leading-4 p-0 m-0">
          {numeral} {nombre}
        </h4>
      </Link>
      <div
        style={{
          borderBottomColor: `${colors[numeral]}`,
          visibility: active === numeral ? 'visible' : 'hidden',
          opacity: active === numeral ? '1' : '0',
          width: '0',
          height: '0',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: `8px solid ${colors[numeral]}`,
          margin: '0 auto',
        }}
      ></div>
    </div>
  );
};

interface PrimaryNavMdeaProps {
  items: IndiceItem[];
}
function PrimaryNavMdea({ items }: PrimaryNavMdeaProps) {
  const colors = COLORES_MDEA;
  const activeItem = useIndiceItemNivel1Seleccionado();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-5">
        {items.map((item: IndiceItem) => (
          <NavItem
            key={item.numeral}
            nombre={item.nombre}
            numeral={item.numeral}
            active={activeItem}
          />
        ))}
      </div>
      <div
        className="h-[4px] w-full rounded-[4px]"
        style={{ backgroundColor: `${colors[activeItem]}` }}
      ></div>
    </>
  );
}

export default PrimaryNavMdea;
