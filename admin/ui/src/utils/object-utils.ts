/**
 * deepAssign
 *
 * Función para asignar recursivamente las propiedades de un objeto a otro
 * Creditos: https://stackoverflow.com/a/61395050/13780697
 *
 * @param {Object} target Objeto destino
 * @param {Object} sources Uno o más objetos origen
 * @returns {Object} Objeto destino con las propiedades de los objetos origen
 */
export const deepAssign = (target, ...sources) => {
  for (const source of sources) {
    for (const k in source) {
      const vs = source[k], vt = target[k]
      if (Object(vs) == vs && Object(vt) === vt) {
        target[k] = deepAssign(vt, vs)
        continue
      }
      target[k] = deepClone(source[k])
    }
  }
  return target
}

/**
 * deepClone
 * Generado por ChatGPT
 *
 * @param {Object} obj Objeto a clonar
 * @returns {Object} Objeto clonado
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const cloned = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }

  return cloned
}
