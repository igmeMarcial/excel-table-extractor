import React from "react";
import Input from "../../../components/Input";
import IndicadorDataGrid from "./IndicadorDataGrid";
import { indicadorData } from "../../../mock/indicadorData";

interface IndicadorEditorTabDatosProps {
  tableData: any;
}

type FieldType = "text" | "table"; // Ajusta según tus necesidades

interface Field {
  label: string;
  type: FieldType;
  required: boolean;
  default: string;
}

const fieldsArray: Record<string, Field> = {
  titulo: {
    label: "Título",
    type: "text", // Puedes ajustar el tipo según tus necesidades
    required: true,
    default: "",
  },
  tablaDatos: {
    label: "Tabla de datos",
    type: "table", // Puedes ajustar el tipo según tus necesidades
    required: true,
    default: "",
  },
  nota: {
    label: "Nota",
    type: "text", // Puedes ajustar el tipo según tus necesidades
    required: false, // Puedes ajustar según tus necesidades
    default: "",
  },
  fuente: {
    label: "Fuente",
    type: "text", // Puedes ajustar el tipo según tus necesidades
    required: false, // Puedes ajustar según tus necesidades
    default: "",
  },
  elaboracion: {
    label: "Elaboración",
    type: "text", // Puedes ajustar el tipo según tus necesidades
    required: false, // Puedes ajustar según tus necesidades
    default: "",
  },
};

const IndicadorEditorTabDatos: React.FC<IndicadorEditorTabDatosProps> = ({
  tableData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    // Lógica para manejar el cambio de valor
  };
  return (
    <div className="overflow-auto scroll-container" style={{ height: "380px" }}>
      <form>
        <table className="form-table">
          <tbody>
            {Object.entries(fieldsArray).map(([key, field]) => (
              <tr key={key} className="flex flex-col pb-0">
                <th scope="row" className="th_data">
                  <label htmlFor={key}>{field.label}</label>
                </th>
                <td className="td-data">
                  {field.type === "table" ? (
                    <>
                      {tableData.tableData && tableData.tableData.length > 0 ? (
                        <IndicadorDataGrid data={tableData.tableData} />
                      ) : (
                        <div>No hay datos</div>
                      )}
                    </>
                  ) : (
                    <Input
                      name={key}
                      type={field.type}
                      text={field.label}
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
