type FieldType = 'select' | 'text' | 'url' | 'email' | 'textarea' | 'table';

interface FieldConfig {
  label: string;
  type: FieldType;
  required?: boolean;
  vtype?: 'url' | 'email';
}

export const ESTADISTICA_FIELDS_DEF: Record<string, FieldConfig> = {
  componenteId: {
    label: 'Componente',
    type: 'select',
    required: true,
  },
  subcomponenteId: {
    label: 'Sub componente',
    type: 'select',
    required: true,
  },
  temaEstadisticoId: {
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
    label: 'Fuente', type: 'text', required: true
  },
  unidadOrganicaGeneradora: {
    label: 'Unidad orgánica generadora',
    type: 'text',
    required: true,
  },
  url: {
    label: 'URL', type: 'url',
    required: true,
    vtype: 'url',
  },
  periodicidadGeneracion: {
    label: 'Periodicidad de generación',
    type: 'textarea',
    required: true,
  },
  periodicidadEntrega: {
    label: 'Periodicidad de entrega/registro',
    type: 'textarea',
    required: true,
  },
  periodoSerieTiempo: {
    label: 'Periodo de serie de tiempo',
    type: 'text',
    required: true,
  },
  ambitoGeografico: {
    label: 'Ámbito geográfico',
    type: 'textarea',
    required: true,
  },
  limitaciones: {
    label: 'Limitaciones',
    type: 'textarea',
    required: true,
  },
  relacionObjetivosNacionales: {
    label: 'Relación con objetivos nacionales',
    type: 'textarea',
    required: true,
  },
  relacionIniciativasInternacionales: {
    label: 'Relación con iniciativas internacionales',
    type: 'textarea',
    required: true,
  },
  correoElectronico: {
    label: 'Correo electrónico',
    type: 'email',
    required: true,
  },
  datosContacto: {
    label: 'Datos del contacto',
    type: 'text',
    required: true,
  },
  telefonoCelular: {
    label: 'Teléfono/celular',
    type: 'text',
    required: true,
  },
};

export const DATOS_FIELDS_DEF: Record<string, FieldConfig> = {
  nombre: {
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
