import { useEffect, useState } from 'react';
import { Button } from '@fluentui/react-components';
import { useAppSelector } from '../app/hooks';
import { selectEstadisticaData } from '../app/AppSlice';
import { PdfIcon } from './Icons';
import { apiMap } from './FichaTecnicaMap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FichaTecnicaPdf } from './FichaTecnicaPdf';

function FichaTecnica() {
  const [dataIndicator, setDataIndicator] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
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
      finalidad: data?.finalidad,
      descripcion: data?.descripcion,
      unidadMedida: data?.unidadMedida,
      formulaCalculo: data?.formulaCalculo,
      metodologiaCalculo: data?.metodologiaCalculo,
      fuente: data?.fuente,
      unidadOrganicaGeneradora: data?.unidadOrganicaGeneradora,
      ambitoGeografico: data?.ambitoGeografico,
      limitaciones: data?.limitaciones,
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
  const handlePdfDownload = () => {
    setLoadingPdf(true);
    // Lógica adicional para descargar el PDF
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
    <div className="overflow-auto">
      <div id="downloadArea">
        <div className="relative my-1">
          {dataIndicator.map((item, rowIndex) => (
            <div
              className="indicadores mb-3 break-words"
              key={`row-${item.id}`}
            >
              <div
                style={{
                  color: 'rgb(12, 113, 195)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {item.key}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  textAlign: 'justify',
                  fontWeight:
                    item.key === 'Nombre del indicador o estadística ambiental'
                      ? 'bold'
                      : 'normal',

                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {renderValue(item.key, item.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <PDFDownloadLink
          document={<FichaTecnicaPdf data={dataIndicator} />}
          fileName="fichaTecnica.pdf"
          onClick={handlePdfDownload}
        >
          {({ loading, url, error, blob }) =>
            loadingPdf && loading ? (
              <Button icon={<PdfIcon />}>Cargando...</Button>
            ) : (
              <Button icon={<PdfIcon />}>Descargar PDF</Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}
export default FichaTecnica;
