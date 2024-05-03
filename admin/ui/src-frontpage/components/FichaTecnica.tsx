import { useEffect, useState } from 'react';
import { Button } from '@fluentui/react-components';
import { useAppSelector } from '../app/hooks';
import { selectEstadisticaData } from '../app/AppSlice';
import { PdfIcon } from './Icons';
import { apiMap } from './FichaTecnicaMap';
import jsPDF from 'jspdf';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { FichaTecnicaPdf } from './FichaTecnicaPdf';
import html2canvas from 'html2canvas';
const logoSinia = 'images/logo_sinia.png',
  logoMinanSvg = 'images/LogoMinan.svg',
  logoMinan = 'images/logo_minan2.png';

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

  const downloadPdf = () => {
    let doc = new jsPDF('p', 'pt', 'a4');

    // Obtiene el tamaño de la página
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    let pad = 20;
    // Definir las coordenadas y dimensiones de la primera imagen
    let x1 = pad;
    let y1 = 50;
    let width1 = 300;
    let height1 = 60;

    // Definir las coordenadas y dimensiones de la segunda imagen
    let x2 = pageWidth - 200; // Añadir un espacio de 10 unidades entre las imágenes
    let y2 = y1;
    let width2 = 150;
    let height2 = 80;

    // Agregar la primera imagen
    // doc.addImage(logoMinan, 'PNG', x1, y1, width1, height1);

    // // Agregar la segunda imagen
    // doc.addImage(logoSinia, 'PNG', x2, y2, width2, height2);

    let elementHTML = document.querySelector('#downloadArea');

    if (elementHTML instanceof HTMLElement) {
      html2canvas(elementHTML)
        .then((canvas) => {
          const imageData = canvas.toDataURL('image/png');

          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = doc.internal.pageSize.getHeight();

          const ratio = canvas.width / canvas.height;
          const width = pdfWidth - 40;
          const height = width / ratio;
          // Agrega la imagen al documento PDF
          doc.addImage(imageData, 'PNG', 0, 0, width, height);

          // Guarda el documento PDF
          doc.save('image.pdf');
        })
        .catch((error) => {
          console.error('Error al convertir HTML a canvas:', error);
        });
    }
  };

  return (
    <div className="overflow-auto">
      <div id="downloadArea" className="py-4">
        <div className="relative my-1">
          <div className="justify-between " style={{ display: 'flex' }}>
            <img style={{ maxWidth: '30%' }} src={logoMinan} alt="Minan" />
            <img
              style={{ maxWidth: '30%', maxHeight: '60px' }}
              src={logoSinia}
              alt="Sinia"
            />
          </div>
          {dataIndicator.map((item, rowIndex) => (
            <div className="indicadores" key={`row-${item.id}`}>
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
      <div className="flex gap-4  mb-4">
        <Button onClick={() => downloadPdf()} icon={<PdfIcon />}>
          Descargar PDF
        </Button>
      </div>
      {/* <div>
        <PDFDownloadLink
          document={<FichaTecnicaPdf />}
          fileName="fichaTecnica.pdf"
        >
          {({ loading, url, error, blob }) =>
            loading ? <button>Cargando...</button> : <button>Descargar</button>
          }
        </PDFDownloadLink>
      </div> */}
    </div>
  );
}
export default FichaTecnica;
