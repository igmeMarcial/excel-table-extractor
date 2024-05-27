import { useLocation, useNavigate } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { QUERY_PARAM_MARCO_ORDENADOR } from '../../src/core/constantes';
import { useMarcoOrdenadorParam } from '../../src/hooks/url-hooks';

//ejemplo ruta
const pathUrlImg = {
  mdea: 'https://w7.pngwing.com/pngs/279/212/png-transparent-oecd-d-8-organization-for-economic-cooperation-economy-nuclear-energy-agency-economic-miscellaneous-globe-logo.png',
  pna: 'https://www.iberdrola.com/wcorp/gc/prod/es_ES/estaticos/ods-general/images/ODS-circle.png',
  ods: 'https://yt3.googleusercontent.com/PBTOeLM2oEdRKr8kjKUbdWpuEvQIWCLkoGY0q0EY94_KzItNA3mY9-o_XxnDm2UpF1kSpGA2=s900-c-k-c0x00ffffff-no-rj',
  ocde: 'https://yt3.googleusercontent.com/PBTOeLM2oEdRKr8kjKUbdWpuEvQIWCLkoGY0q0EY94_KzItNA3mY9-o_XxnDm2UpF1kSpGA2=s900-c-k-c0x00ffffff-no-rj',
};

function MarcoOrdenadorNav() {
  const navigate = useNavigate();
  const location = useLocation();
  // Extraer el marco ordenador de la url
  const activeItem = useMarcoOrdenadorParam();

  const onTabSelect = (tabNumber: string) => {
    const newPath = newPathUrl(
      location,
      QUERY_PARAM_MARCO_ORDENADOR,
      String(tabNumber)
    );
    navigate(newPath);
  };
  const items = [
    { text: 'MDEA', path: 'mdea' },
    { text: 'PNA', path: 'pna' },
    { text: 'ODS', path: 'ods' },
    { text: 'OCDE', path: 'ocde' },
  ];
  return (
    <div className="bg-gray-200">
      <div className="mb-4 flex gap-[6px] p-2 bg-white   ">
        {items.map((item) => (
          <div
            key={item.path}
            onClick={() => onTabSelect(item.path)}
            className={`flex cursor-pointer outline-none items-center justify-center  py-1   transition-all duration-300 border-[#dadce0] border-[1px] border-solid rounded-[20px] ${
              activeItem === item.path ? 'bg-blue-600 text-white' : ''
            }`}
          >
            <span className="h-[30px] w-[30px] flex justify-center mx-[6px]">
              <img
                alt={item.text}
                src={pathUrlImg[item.path]}
                className="object-cover object-top rounded-[50%]"
              />
            </span>
            <span className="mr-3">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarcoOrdenadorNav;
