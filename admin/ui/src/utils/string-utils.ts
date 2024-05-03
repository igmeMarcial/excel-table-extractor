

export const capitalizarPrimeraLetra = (texto: string): string => {
  texto = texto || '';
  if (!texto) {
    return '';
  }
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const removeAccents = (string) => {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const toSnakeCase = (string) => {
  return removeAccents(string)
    .replace(/[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+/g, '_')
    .replace(/^(?:_+|_+)$/g, '')
    .toLowerCase();
};

export const calculateSimilarity = (str1, str2) => {
  const minLn = Math.min(str1.length, str2.length);
  const maxLn = Math.max(str1.length, str2.length);
  let commonChars = 0;
  for (let i = 0; i < minLn; i++) {
    if (str1[i] === str2[i]) {
      commonChars++;
    }
  }
  return commonChars / maxLn;
};
