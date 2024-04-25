import { ValidatorFn } from "../../../core/Validators";
import { Estadistica } from "../../../types/Estadistica";

type FieldType = 'select' | 'text' | 'url' | 'email' | 'textarea' | 'table';

export interface FieldDef {
  label: string;
  type: FieldType;
  required?: boolean;
  vtype?: 'url' | 'email';
  customValidators?: ValidatorFn[];
}

export const ESTADISTICA_FIELDS_DEF: {
  [K in keyof Estadistica]?: FieldDef
} = {
  clasificadorN1Id: {
    label: 'Componente',
    type: 'select',
    required: true,
  },
  clasificadorN2Id: {
    label: 'Sub componente',
    type: 'select',
    required: true,
  },
  clasificadorN3Id: {
    label: 'Tema estadístico',
    type: 'select',
    required: true,
  },
  nombre: {
    label: 'Nombre del indicador o estadística ambiental',
    type: 'text',
    required: true,
  },
  finalidad: {
    label: 'Finalidad',
    type: 'textarea',
    required: true,
  },
  descripcion: {
    label: 'Descripción/Definición',
    type: 'textarea',
    required: true,
  },
  unidadMedida: {
    label: 'Unidad de medida',
    type: 'text',
    required: true,
  },
  formulaCalculo: {
    label: 'Fórmula de cálculo',
    type: 'textarea',
    required: true,
  },
  metodologiaCalculo: {
    label: 'Metodología de cálculo',
    type: 'textarea',
    required: true,
  },
  fuente: {
    label: 'Fuente', type: 'text',
  },
  unidadOrganicaGeneradora: {
    label: 'Unidad orgánica generadora',
    type: 'text',
  },
  url: {
    label: 'URL', type: 'url',
    vtype: 'url',
  },
  periodicidadGeneracion: {
    label: 'Periodicidad de generación',
    type: 'textarea',
  },
  periodicidadEntrega: {
    label: 'Periodicidad de entrega/registro',
    type: 'textarea',
  },
  periodoSerieTiempo: {
    label: 'Periodo de serie de tiempo',
    type: 'text',
  },
  ambitoGeografico: {
    label: 'Ámbito geográfico',
    type: 'textarea',
  },
  limitaciones: {
    label: 'Limitaciones',
    type: 'textarea',
    required: true,
  },
  relacionObjetivosNacionales: {
    label: 'Relación con objetivos nacionales',
    type: 'textarea',
  },
  relacionIniciativasInternacionales: {
    label: 'Relación con iniciativas internacionales',
    type: 'textarea',
  },
  correoElectronico: {
    label: 'Correo electrónico',
    type: 'email',
  },
  datosContacto: {
    label: 'Datos del contacto',
    type: 'text',
  },
  telefonoCelular: {
    label: 'Teléfono/celular',
    type: 'text',
  },
  clasificacionMdea: {
    label: 'Clasificación MDEA',
    type: 'text',
  },
};

export const DATOS_FIELDS_DEF: Record<string, FieldDef> = {
  titulo: {
    label: 'Título',
    type: 'text',
    required: true,
  },
  datos: {
    label: 'Tabla de datos',
    type: 'table',
    required: true,
  },
  nota: {
    label: 'Nota',
    type: 'text',
  },
  fuente: {
    label: 'Fuente',
    type: 'text',
  },
  elaboracion: {
    label: 'Elaboración',
    type: 'text',
  }
};
