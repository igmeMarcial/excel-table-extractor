export const numberFormat = (value: number) => {
  const str = value.toString();
  const parts = str.split('.');
  const integer = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const decimal = parts[1] || '';
  return `${integer},${decimal}`;
};
