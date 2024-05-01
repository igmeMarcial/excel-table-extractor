

export const capitalizarPrimeraLetra = (texto: string): string => {
  texto = texto || '';
  if (!texto) {
    return '';
  }
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
