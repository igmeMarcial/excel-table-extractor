import { useLocation, useNavigate } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { QUERY_PARAM_MARCO_ORDENADOR } from '../../src/core/constantes';
import { useMarcoOrdenadorParam } from '../../src/hooks/url-hooks';

//ejemplo ruta

const pathRoot = window.AesaInfo.pluginUrl;
const pathUrlImg = {
  mdea:pathRoot + '/public/assets/images/mdea.jpeg',
  pna:pathRoot + '/public/assets/images/pna.jpg',
  ods:pathRoot + '/public/assets/images/ods.png',
  ocde:pathRoot + '/public/assets/images/ocde.png',
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
      <div className="mb-4 flex gap-[6px] p-2 bg-white   justify-center">
        {items.map((item) => (
          <div
            key={item.path}
            onClick={() => onTabSelect(item.path)}
            className={`flex cursor-pointer outline-none items-center justify-center  py-1   transition-all duration-300 border-[#dadce0] border-[1px] border-solid rounded-[20px] hover:bg-[#e5edff] ${
              activeItem === item.path ? 'bg-[#e5edff]' : ''
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
