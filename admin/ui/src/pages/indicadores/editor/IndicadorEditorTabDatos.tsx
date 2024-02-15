import React, { useEffect, useState } from 'react';
import Input from '../../../components/Input';
import IndicadorDataGrid from './IndicadorDataGrid';


interface IndicadorEditorTabDatosProps {
  tableData: any;
  onChange: (values: any) => void; 
}

type FieldType = 'text' | 'table'; // Ajusta según tus necesidades

interface Field {
  label: string;
  type: FieldType;
  required: boolean;
  default: string | null;
}

const fieldsArray: Record<string, Field> = {
  titulo: {
    label: 'Título',
    type: 'text', 
    required: true,
    default: '',
  },
  tablaDatos: {
    label: 'Tabla de datos',
    type: 'table', 
    required: true,
    default: null,
  },
  nota: {
    label: 'Nota',
    type: 'text', 
    required: false, 
    default: '',
  },
  fuente: {
    label: 'Fuente',
    type: 'text', 
    required: false, 
    default: '',
  },
  elaboracion: {
    label: 'Elaboración',
    type: 'text', 
    required: false,
    default: '',
  },
};

const initialForm = Object.fromEntries(
  Object.entries(fieldsArray)
    .filter(([key, field]) => field.default !== undefined)
    .map(([key, field]) => [key, field.default])
);

const IndicadorEditorTabDatos: React.FC<IndicadorEditorTabDatosProps> = ({
  tableData,onChange
}) => {

  const [values, setValues] = useState<any>(initialForm);


  useEffect(()=>{
    if (tableData && tableData.sheetData) {
      const { nombreIndicador, nota, fuente, elaboracion } = tableData.sheetData;
     const updatedValues = {
      ...initialForm,
      titulo: nombreIndicador || initialForm.titulo,
      nota: nota || initialForm.nota,
      fuente: fuente || initialForm.fuente,
      elaboracion: elaboracion || initialForm.elaboracion,
    };
    setValues(updatedValues); 
    onChange(updatedValues); 
    }

  },[tableData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
  const newValue = e.target.value;
   const updatedValues = {
    ...values,
    [key]: newValue
  };
  onChange(updatedValues)
  setValues(updatedValues)
  };

  
  return (
    <div className="overflow-auto scroll-container" style={{ height: '380px' }}>
      <form>
        <table className="form-table">
          <tbody>
            {Object.entries(fieldsArray).map(([key, field]) => (
              <tr key={key} className="flex flex-col pb-0">
                <th scope="row" className="th_data">
                  <label htmlFor={key}>{field.label}</label>
                </th>
                <td className="td-data">
                  {field.type === 'table' ? (
                    <div
                      style={{ border: '1px solid #8C8F94' }}
                      className="p-4 rounded-sm"
                    >
                      {tableData.tableData && tableData.tableData.length > 0 ? (
                        <IndicadorDataGrid data={tableData.tableData} />
                      ) : (
                        <div>No hay datos</div>
                      )}
                    </div>
                  ) : (
                    <Input
                      name={key}
                      type={field.type}
                      text={field.label}
                       value={values[key]}
                      onChange={(e) => handleChange(e, key)}
                      required={field.required}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default IndicadorEditorTabDatos;
