import { useEffect, useState } from 'react';
import { Button } from '@fluentui/react-components';
import { useAppSelector } from '../app/hooks';
import { selectEstadisticaData } from '../app/AppSlice';
import { PdfIcon } from './Icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { apiMap } from './FichaTecnicaMap';

function FichaTecnica() {
  const [dataIndicator, setDataIndicator] = useState([]);
  const data = useAppSelector(selectEstadisticaData);
  console.log(data);
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

      unidadMedida: data?.unidadMedida,
      formulaCalculo: data?.formulaCalculo,
      unidadOrganicaGeneradora: data?.unidadOrganicaGeneradora,
      url: data?.url,
      periodicidadGeneracion: data?.periodicidadGeneracion,
      periodicidadEntrega: data?.periodicidadEntrega,
      periodoSerieTiempo: data?.periodoSerieTiempo,
      ambitoGeografico: data?.ambitoGeografico,
      relacionObjetivosNacionales: data?.relacionObjetivosNacionales,
      relacionIniciativasInternacionales:
        data?.relacionIniciativasInternacionales,
      correoElectronico: data?.correoElectronico,
      datosContacto: data?.datosContacto,
      telefonoCelular: data?.telefonoCelular,
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

  const downloadPdf = () => {
    const downloadArea = document.getElementById('downloadArea');
    html2canvas(downloadArea).then((canvas) => {
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const ratio = canvas.width / canvas.height;
      const width = pdfWidth - 40;
      const height = width / ratio;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 20, 20, width, height);
      pdf.save('documento.pdf');
    });
  };

  return (
    <div className="overflow-auto">
      <div id="downloadArea" className="p-4">
        <div className="relative my-1 mx-2">
          <div>
            {dataIndicator.map((item, rowIndex) => (
              <div
                key={`row-${item.id}`}
                style={{ display: item.id > 6 ? 'none' : 'block' }}
              >
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
      <div className="flex gap-4  mb-4 pl-4">
        <Button onClick={() => downloadPdf()} icon={<PdfIcon />}>
          Descargar PDF
        </Button>
      </div>
    </div>
  );
}
export default FichaTecnica;
