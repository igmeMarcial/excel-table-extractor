import { useRef, useState } from 'react';
import { Button } from 'antd';
import { ArrowImport24Regular } from '@fluentui/react-icons';
import { WorkBook } from 'xlsx';
import { readExcelFile } from '../utils/file-utils';
interface GetWorkbookButtonProps {
  text: string;
  loadingText?: string;
  onWorkbookReady: (file: WorkBook) => void;
  icon?: React.ReactNode;
}

function GetWorkbookButton({
  text,
  loadingText,
  onWorkbookReady,
  icon,
}: Readonly<GetWorkbookButtonProps>) {
  // File input element reference
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    fileInputRef.current.value = null;
    setLoading(true);
    // Lógica para leer el archivo
    readExcelFile(file)
      .then((workbook) => {
        if (workbook) {
          onWorkbookReady(workbook);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(
          'Ocurrió un error al leer el archivo Excel, verifique que el archivo sea válido y tenga el fomato correcto.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onClickTrigger = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        className="hidden"
        type="file"
        onChange={handleFileChange}
        accept=".xlsx"
        ref={fileInputRef}
      />
      <Button
        type="text"
        onClick={onClickTrigger}
        icon={icon || <ArrowImport24Regular className="w-5 align-middle" />}
        loading={loading}
      >
        {loading ? loadingText || text : text}
      </Button>
    </>
  );
}

export default GetWorkbookButton;
