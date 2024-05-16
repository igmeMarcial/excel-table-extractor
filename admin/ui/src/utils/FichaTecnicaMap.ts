import { Estadistica } from "../types/Estadistica";

export const apiMap: {
  [K in keyof Estadistica]?: any;
} = {
  id: 1,
  clasificadorN1Id: 1,
  clasificadorN2Id: 1,
  clasificadorN3Id: 1,
  nombre: 'Nombre del indicador o estadística ambiental',
  finalidad: 'Finalidad',
  descripcion: 'Descripción/Definición',
  unidadMedida: 'Unidad de medida',
  formulaCalculo: 'Fórmula de cálculo',
  metodologiaCalculo: 'Metodología de cálculo',
  fuente: 'Fuente',
  unidadOrganicaGeneradora: 'Unidad orgánica generadora',
  url: 'URL',
  periodicidadGeneracion:
    'Periodicidad de generación de la información por la entidad',
  periodicidadEntrega:
    'Periodicidad de entrega/registro de la información por la entidad',
  periodoSerieTiempo: 'Periodo de serie de tiempo',
  ambitoGeografico: 'Ámbito geográfico',
  limitaciones: 'Limitaciones',
  relacionObjetivosNacionales:
    'Relación con objetivos de política, normas, metas ambientales nacionales',
  relacionIniciativasInternacionales:
    'Relación con iniciativas internacionales',
  correoElectronico: 'Correo electrónico',
  datosContacto: 'Datos del contacto',
  telefonoCelular: 'Teléfono/celular',
  datos: null,
};
