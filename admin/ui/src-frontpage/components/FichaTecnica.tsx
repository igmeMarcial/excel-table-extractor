import { useEffect, useState } from 'react';
import { Button } from '@fluentui/react-components';
import { useAppSelector } from '../app/hooks';
import { selectEstadisticaData } from '../app/AppSlice';
import { Estadistica } from '../../src/types/Estadistica';

const apiMap: {
  [K in keyof Estadistica]?: any;
} = {
  id: 1,
  clasificadorN1Id: 1,
  clasificadorN2Id: 1,
  clasificadorN3Id: 1,
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

    //Campos que se mostraran en el front
    const newArrNecessary = {
      nombre: data?.nombre,
      descripcion: data?.descripcion,
      finalidad: data?.finalidad,
      limitaciones: data?.limitaciones,
      metodologiaCalculo: data?.metodologiaCalculo,
      fuente: data?.fuente,
    };

    const filteredEntries = Object.entries(newArrNecessary).filter(
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

  const handleDowload = () => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fichaEstadistico.pdf');
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className="overflow-auto">
      <div className="p-4">
        <div className="relative my-1 mx-2">
          <div className="absolute top-2 right-0 text-xs">
            <Button onClick={handleDowload}>Descargar</Button>
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
