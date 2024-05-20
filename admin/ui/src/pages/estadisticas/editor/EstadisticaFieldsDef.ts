import { ValidatorFn } from '../../../core/Validators';
import { Estadistica } from '../../../types/Estadistica';
import { FieldType } from '../../../types/FieldType';

type DataType = 'number' | 'string' | 'boolean' | 'url' | 'email';
export interface FieldDef {
  label: string;
  placeholder?: string;
  controlType: FieldType;
  required?: boolean;
  dataType?: DataType;
  customValidators?: ValidatorFn[];
}

export const ESTADISTICA_FICHA_FIELDS_DEF: {
  [K in keyof Estadistica]?: FieldDef;
} = {
  clasificadorN1Id: {
    label: 'Componente',
    controlType: 'select',
    required: true,
  },
  clasificadorN2Id: {
    label: 'Sub componente',
    controlType: 'select',
    required: true,
  },
  clasificadorN3Id: {
    label: 'Tema estadístico',
    controlType: 'select',
    required: true,
  },
  nombre: {
    label: 'Nombre del indicador o estadística ambiental',
    controlType: 'text',
    required: true,
  },
  finalidad: {
    label: 'Finalidad',
    controlType: 'textarea',
    required: true,
  },
  descripcion: {
    label: 'Descripción/Definición',
    controlType: 'textarea',
    required: true,
  },
  unidadMedida: {
    label: 'Unidad de medida',
    controlType: 'text',
    required: true,
  },
  formulaCalculo: {
    label: 'Fórmula de cálculo',
    controlType: 'textarea',
    required: true,
  },
  metodologiaCalculo: {
    label: 'Metodología de cálculo',
    controlType: 'textarea',
    required: true,
  },
  fuente: {
    label: 'Fuente',
    controlType: 'text',
  },
  unidadOrganicaGeneradora: {
    label: 'Unidad orgánica generadora',
    controlType: 'text',
  },
  url: {
    label: 'URL',
    controlType: 'text',
    dataType: 'url',
  },
  periodicidadGeneracion: {
    label: 'Periodicidad de generación',
    controlType: 'textarea',
  },
  periodicidadEntrega: {
    label: 'Periodicidad de entrega/registro',
    controlType: 'textarea',
  },
  periodoSerieTiempo: {
    label: 'Periodo de serie de tiempo',
    controlType: 'text',
  },
  ambitoGeografico: {
    label: 'Ámbito geográfico',
    controlType: 'textarea',
  },
  limitaciones: {
    label: 'Limitaciones',
    controlType: 'textarea',
    required: true,
  },
  relacionObjetivosNacionales: {
    label: 'Relación con objetivos nacionales',
    controlType: 'textarea',
  },
  relacionIniciativasInternacionales: {
    label: 'Relación con iniciativas internacionales',
    controlType: 'textarea',
  },
  correoElectronico: {
    label: 'Correo electrónico',
    controlType: 'text',
    dataType:'email'
  },
  datosContacto: {
    label: 'Datos del contacto',
    controlType: 'text',
  },
  telefonoCelular: {
    label: 'Teléfono/celular',
    controlType: 'text',
  },
  clasificacionOds:{
    label:'Clasificación ODS',
    controlType:'text'
  },
  clasificacionOcde:{
    label:'Clasificación OCDE',
    controlType:'text'
  },
  clasificacionPna:{
    label:'Clasificación PNA',
    controlType:'text',
  },
  activo: {
    label: 'Activo',
    controlType: 'switch',
    dataType: 'boolean',
  },
  archivado: {
    label: 'Archivado',
    controlType: 'switch',
    dataType: 'boolean',
  },
};

export const DATOS_FIELDS_DEF: Record<string, FieldDef> = {
  presentacionTablaTitulo: {
    label: 'Título',
    controlType: 'text',
  },
  presentacionTablaSubtitulo: {
    label: 'Subtítulo',
    controlType: 'text',
  },
  presentacionTablaNota: {
    label: 'Nota',
    controlType: 'textarea',
  },
  presentacionTablaFuente: {
    label: 'Fuente',
    controlType: 'textarea',
  },
  datos: {
    label: 'Tabla',
    controlType: 'table',
    required: true,
  },
  presentacionTablaElaboracion: {
    label: 'Elaboración',
    controlType: 'textarea',
  },
};

export const ESTADISTICA_FULL_FIELDS_DEF = {
  ...ESTADISTICA_FICHA_FIELDS_DEF,
  ...DATOS_FIELDS_DEF,
};
