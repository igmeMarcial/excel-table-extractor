import { useEffect, useState } from 'react';
import { Button } from '@fluentui/react-components';
import { useAppSelector } from '../app/hooks';
import { selectEstadisticaData } from '../app/AppSlice';
import { PdfIcon } from './Icons';
import jsPDF from 'jspdf';
import { apiMap } from './FichaTecnicaMap';

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
      // campos ocultos >6 el orden de cada propiedad es importante.
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
    let doc = new jsPDF('p', 'pt', 'a4');
    const hiddenElements = document.querySelectorAll(
      '#downloadArea .indicadores'
    );
    hiddenElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.display = 'block'; // Mostrar el elemento
      }
    });
    let elementHTML = document.querySelector('#downloadArea').innerHTML;
    hiddenElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.display = 'none'; // Ocultar el elemento nuevamente
      }
    });
    const pdfWidth = doc.internal.pageSize.getWidth();
    doc.html(elementHTML, {
      callback: function (doc) {
        // Save the PDF
        doc.save('documento.pdf');
      },
      margin: [30, 30, 10, 30],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: pdfWidth, //target width in the PDF document
      windowWidth: 675, //window width in CSS pixels
    });
  };

  return (
    <div className="overflow-auto">
      <div id="downloadArea" className="p-4">
        <div className="relative my-1 mx-2">
          <div>
            <div
              className="indicadores"
              style={{
                fontWeight: 'bold',
                fontSize: '1rem',
                marginBottom: '0.75rem',
                display: 'none',
                fontFamily: 'sans-serif,Arial',
              }}
            >
              Ficha de Divulgación de Estadística Ambiental - MINAN.
            </div>
            {dataIndicator.map((item, rowIndex) => (
              <div
                className={item.id > 6 ? 'indicadores' : ''}
                key={`row-${item.id}`}
                style={{ display: item.id > 6 ? 'none' : 'block' }}
              >
                <div
                  style={{
                    color: 'rgb(12, 113, 195)',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginTop: item.id === 1 ? '0px' : '10px',
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
                      item.key ===
                      'Nombre del indicador o estadística ambiental'
                        ? 'bold'
                        : 'normal',
                    paddingRight: '110px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                >
                  {renderValue(item.key, item.value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4  mb-4 pl-6">
        <Button onClick={() => downloadPdf()} icon={<PdfIcon />}>
          Descargar PDF
        </Button>
      </div>
    </div>
  );
}
export default FichaTecnica;
