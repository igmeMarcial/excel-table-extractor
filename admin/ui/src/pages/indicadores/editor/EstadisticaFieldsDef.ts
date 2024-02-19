interface FieldsArray {
  label: string;
  type: 'select' | 'text' | 'url' | 'email'; // Añadí los tipos de campo adicionales
  required?: boolean;
  default?: string;
}

export const ESTADISTICA_FIELDS_DEF: Record<string, FieldsArray> = {
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
    required: false,
  },
  descripcionDefinicion: {
    label: 'Descripción/Definición',
    type: 'text',
    required: true,
  },
  unidadDeMedida: {
    label: 'Unidad de medida',
    type: 'text',
    required: true,
  },
  formulaCalculo: {
    label: 'Fórmula de cálculo',
    type: 'text',
    required: true,
  },
  metodologiaCalculo: {
    label: 'Metodología de cálculo',
    type: 'text',
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
  },
  periodicidadGeneracion: {
    label: 'Periodicidad de generación',
    type: 'text',
    required: true,
  },
  periodicidadEntregaRegistro: {
    label: 'Periodicidad de entrega/registro',
    type: 'text',
    required: true,
  },
  periodoSerieTiempo: {
    label: 'Periodo de serie de tiempo',
    type: 'text',
    required: true,
  },
  ambitoGeografico: {
    label: 'Ámbito geográfico',
    type: 'text',
    required: true,
  },
  limitaciones: {
    label: 'Limitaciones',
    type: 'text',
    required: true,
  },
  relacionObjetivos: {
    label: 'Relación con objetivos nacionales',
    type: 'text',
    required: true,
  },
  relacionIniciativasInternacionales: {
    label: 'Relación con iniciativas internacionales',
    type: 'text',
    required: true,
  },
  correoElectronico: {
    label: 'Correo electrónico',
    type: 'email',
    required: true,
  },
  wpDefaultFieldLabel: {
    label: 'WP/default-field-label',
    type: 'text',
    required: true,
  },
  telefonoCelular: {
    label: 'Teléfono/celular',
    type: 'text',
    required: true,
  },
};
