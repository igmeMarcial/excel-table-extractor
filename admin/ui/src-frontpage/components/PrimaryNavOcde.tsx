import { OBJETIVOS_OCDE } from '../../src/config/colors';

function PrimaryNavOcde() {
  const items = OBJETIVOS_OCDE;
  const mitad1 = items.slice(0, Math.ceil(items.length / 2));
  const mitad2 = items.slice(Math.ceil(items.length / 2));
  return (
    <>
      <div className="flex justify-between flex-wrap mt-5 mb-2">
        {mitad1.map((item, index) => (
          <div
            key={item.color}
            className={` min-h-16 p-2 rounded-lg text-center text-white content-center`}
            style={{
              backgroundColor: item.color,
              width: 'calc(16.6666667% - ( 0.83333333333333 * 30px ))',
            }}
          >
            {item?.titulo}
          </div>
        ))}
      </div>
      <div className="flex justify-between flex-wrap mt-2 mb-5">
        {mitad2.map((item, index) => (
          <div
            key={item.color}
            className={` min-h-16 p-2 rounded-lg text-center text-white content-center`}
            style={{
              backgroundColor: item.color,
              width: 'calc(16.6666667% - ( 0.83333333333333 * 30px ) )',
            }}
          >
            {item?.titulo}
          </div>
        ))}
      </div>
    </>
  );
}

export default PrimaryNavOcde;
