

export function quitarParentesis(texto:string) {
  // Expresión regular para buscar texto entre paréntesis
  const regex = /\([^()]*\)/g;
  // Reemplazar texto entre paréntesis con una cadena vacía
  const textoSinParentesis = texto.replace(regex, '').trim();
  return textoSinParentesis;
}
export function obtenerTextoEntreParentesis(texto: string): string {
  const regex = /\(([^)]+)\)/g;
  // Buscar todas las coincidencias
  const coincidencias = texto.match(regex);
  // Retornar las coincidencias encontradas
  return coincidencias ? coincidencias.join('') : '';
}