/**
 * Extrae el texto de la unidad de medida de un string en el formato
 * "Unidad de medida (simbolo)"
 *
 * @param unidadMedida  Unidad de medida en formato "Unidad de medida (simbolo)"
 * @param capitalizar  Capitalizar primera letra
 * @returns
 */

import { DATO_TABLA_NO_DISPONIBLE, DATO_TABLA_NO_DISPONIBLE_ALT } from "../config/constantes";
import { capitalizarPrimeraLetra } from "./string-utils"

const RE_TEXTO_ENTRE_PARENTESIS_FINAL = /\(([^(^)]+)\)$/

export const removerTextoEntreParentesisDelFinal = (unidadMedida: string, capitalizar?: boolean) => {
  let out = '';
  unidadMedida = unidadMedida || ''
  // Borrar simbolo entre paréntesis
  out = unidadMedida.replace(/\(.*\)$/, '').trim()
  // Capitalizar primera letra
  if (capitalizar !== false) {
    out = capitalizarPrimeraLetra(out)
  }
  return out
};

export const getTextoEntreParentesisDelFinal = (unidadMedida: string) => {
  unidadMedida = unidadMedida || ''
  // Buscar simbolo entre paréntesis
  const coincidencias = RE_TEXTO_ENTRE_PARENTESIS_FINAL.exec(unidadMedida)
  // Retornar simbolo encontrado
  return coincidencias ? coincidencias[1] : ''
}

export const contieneTextoEntreParentesisAlFinal = (titulo: string): boolean => {
  return RE_TEXTO_ENTRE_PARENTESIS_FINAL.test(titulo)
}

export const getUnidadMedidaParaSubtitulo = (tituloTablaDatos: string, unidadMedida: string) => {
  // Si el título de la tabla de datos contiene texto entre paréntesis, obtenerlo
  const unidadMedidaDesdeTitulo = getTextoEntreParentesisDelFinal(tituloTablaDatos)
  const unidadMedidaDesdeFicha = removerTextoEntreParentesisDelFinal(unidadMedida)
  // Retornar unidad de medida desde el título si es que existe, de lo contrario, desde la ficha técnica
  // Retornar el texto más largo
  const out = unidadMedidaDesdeTitulo.length > unidadMedidaDesdeFicha.length ? unidadMedidaDesdeTitulo : unidadMedidaDesdeFicha
  return capitalizarPrimeraLetra(out)
}

export const determinarTituloTablaDatosDefecto = (nombreEstadistica: string, periodoSerieTiempo: string) => {
  return (nombreEstadistica || '') + (periodoSerieTiempo ? ', ' + periodoSerieTiempo : '')
}

export const determinarSubtituloParaGrafico = (subtituloGrafico: string, subtituloTablaDatos: string, tituloTablaDatos: string, unidadMedida) => {
  if (subtituloGrafico) {
    return subtituloGrafico
  }
  if (subtituloTablaDatos) {
    return subtituloTablaDatos
  }

  return `(${getUnidadMedidaParaSubtitulo(tituloTablaDatos, unidadMedida)})`
}

export const esSimboloDeDatoNoDisponible = (valor: string) => {
  return valor === DATO_TABLA_NO_DISPONIBLE || valor === DATO_TABLA_NO_DISPONIBLE_ALT
}
