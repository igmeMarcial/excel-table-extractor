import { useEffect, useState } from 'react';

import { useAppSelector } from '../app/hooks';
import { selectEstadisticaData } from '../app/AppSlice';

const apiMap = {
  id: 1,
  componenteId: 1,
  subcomponenteId: 1,
  temaEstadisticoId: 1,
  usuarioRegId: 0,
  usuarioModId: 0,
  fechaReg: 0,
  fechaMod: 0,
  activo: true,
  archivado: false,
  eliminado: false,
  nombre: 'Nombre del indicador o estadística ambiental',
  finalidad: 'Finalidad',
  descripcion: 'Descripción/Definición',
  unidadMedida: 'Unidad de medida',
  formulaCalculo: 'Fórmula de cálculo',
  metodologiaCalculo: 'Metodología de cálculo',
  fuente: 'Fuente',
  unidadOrganicaGeneradora: 'Unidad orgánica generadora',
  url: 'URL',
  periodicidadGeneracion:
    'Periodicidad de generación de la información por la entidad',
  periodicidadEntrega:
    'Periodicidad de entrega/registro de la información por la entidad',
  periodoSerieTiempo: 'Periodo de serie de tiempo',
  ambitoGeografico: 'Ámbito geográfico',
  limitaciones: 'Limitaciones',
  relacionObjetivosNacionales:
    'Relación con objetivos de política, normas, metas ambientales nacionales',
  relacionIniciativasInternacionales:
    'Relación con iniciativas internacionales',
  correoElectronico: 'Correo electrónico',
  datosContacto: 'Datos del contacto',
  telefonoCelular: 'Teléfono/celular',
  datos: null,
  parametrosPublicacion: null,
};

function FichaTecnica() {
  const [dataIndicator, setDataIndicator] = useState([]);

  const data = useAppSelector(selectEstadisticaData);
  
  useEffect(() => {
    if (data && typeof data === 'object') {
      convertObjectToArr();
    }
  }, [data]);
  const convertObjectToArr = () => {
    if (!data || typeof data !== 'object') {
      return;
    }
    const filteredEntries = Object.entries(data).filter(
      ([_, value]) => typeof value === 'string'
    );
    const formattedData = filteredEntries.map(([key, value], index) => ({
      id: index + 1,
      key: apiMap[key],
      value: value,
    }));
    setDataIndicator(formattedData);
  };

  const renderValue = (fieldName, value) => {
    const formattedValue = value.replace(/\n/g, '<br>');
    const clickableValue = formattedValue.replace(
      /\b(https?:\/\/\S+)/gi,
      '<a href="$1" target="_blank">$1</a>'
    );

    return <span dangerouslySetInnerHTML={{ __html: clickableValue }} />;
  };

  if (!dataIndicator || dataIndicator === null) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div className="overflow-auto w-full ">
      <div className="p-4">
        <div className="relative my-1 mx-2">
          <div className="absolute top-2 right-0 text-xs">
            <a  className="font-bold cursor-pointer text-red-400 hover:bg-red-200 py-2 px-3 hover:border hover:border-red-600 hover:border-solid rounded-md">
              Descargar
            </a>
          </div>
          <div>
            {dataIndicator.map((item, rowIndex) => (
              <div key={`row-${item.id}`}>
                <div
                  style={{
                    color: 'rgb(12, 113, 195)',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginTop: item.id === 1 ? '0px' : '10px',
                  }}
                >
                  {item.key}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    textAlign: 'justify',
                    fontWeight:
                      item.key ===
                      'Nombre del indicador o estadística ambiental'
                        ? 'bold'
                        : 'normal',
                    paddingRight: '110px',
                  }}
                >
                  {renderValue(item.key, item.value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default FichaTecnica;
