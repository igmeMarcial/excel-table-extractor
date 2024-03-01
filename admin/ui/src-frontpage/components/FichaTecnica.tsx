import { makeStyles} from '@fluentui/react-components';
import { useEffect, useState } from 'react';

import { useAppSelector } from '../app/hooks';
import { selectEstadisticaData } from '../app/AppSlice';


const useStyles = makeStyles({
  dataGrid: {
    position: 'relative',
    borderCollapse: 'separate',
    borderSpacing: '0',
    width: '100%',
    '> tbody >tr': {
      ':first-child': {
        '>td': {
          'border-top-width': '2px',
          backgroundColor: '#E6F3FF',
        },
      },
      '>td': {
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingLeft: '8px',
        paddingRight: '8px',
        'border-width': '0 2px 2px 0',
        'border-color': '#0071BC',
        'border-style': 'solid',
        backgroundColor: '#E6F3FF',
        ':first-child': {
          'border-left-width': '2px',
          backgroundColor: '#E6F3FF',
        },
        ':last-child': {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

const  apiMap =
{
    "id": 1,
    "componenteId": 1,
    "subcomponenteId": 1,
    "temaEstadisticoId": 1,
    "usuarioRegId": 0,
    "usuarioModId": 0,
    "fechaReg": 0,
    "fechaMod": 0,
    "activo": true,
    "archivado": false,
    "eliminado": false,
    "nombre": "Nombre del indicador o estadística ambiental",
    "finalidad": "Finalidad",
    "descripcion": "Descripción/Definición",
    "unidadMedida": "Unidad de medida",
    "formulaCalculo": "Fórmula de cálculo",
    "metodologiaCalculo": "Metodología de cálculo",
    "fuente": "Fuente",
    "unidadOrganicaGeneradora": "Unidad orgánica generadora",
    "url": "URL",
    "periodicidadGeneracion": "Periodicidad de generación de la información por la entidad",
    "periodicidadEntrega": "Periodicidad de entrega/registro de la información por la entidad",
    "periodoSerieTiempo": "Periodo de serie de tiempo",
    "ambitoGeografico": "Ámbito geográfico",
    "limitaciones": "Limitaciones",
    "relacionObjetivosNacionales": "Relación con objetivos de política, normas, metas ambientales nacionales",
    "relacionIniciativasInternacionales": "Relación con iniciativas internacionales",
    "correoElectronico": "Correo electrónico",
    "datosContacto": "Datos del contacto",
    "telefonoCelular": "Teléfono/celular",
    "datos": null,
    "parametrosPublicacion": null
}

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
    const formattedData = filteredEntries.map(([key, value],index) => ({
      id: index +1,
      key: apiMap[key],
      value: value,
    }));
    setDataIndicator(formattedData);
  };

  const renderValue=(fieldName,value)=>{
    const formattedValue = value.replace(/\n/g, '<br>');
     const clickableValue = formattedValue.replace(/\b(https?:\/\/\S+)/gi, '<a href="$1" target="_blank">$1</a>');

    return <span dangerouslySetInnerHTML={{ __html: clickableValue }} />;
  }
  const classes = useStyles();


  if (!dataIndicator || dataIndicator === null) {
    return <div>No hay datos disponibles.</div>;
  }
  
  return (
    <div className="overflow-auto w-full ">
      <table className={classes.dataGrid}>
        <tbody>
          {dataIndicator.map((item, rowIndex) => (
            <tr key={`row-${item.id}`}>
              <td className="font-semibold text-black">{item.id}</td>
              <td className="font-semibold text-black">{item.key}</td>
              <td>{renderValue(item.key,item.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default FichaTecnica;
