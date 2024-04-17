export const numberFormat = (value: number, decimals?: number) => {
  const str = value.toString();
  const parts = str.split('.');
  const integer = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  let decimal = parts[1] || '';
  if (decimals) {
    decimal = decimal.slice(0, decimals).padEnd(decimals, '0');
  }
  return `${integer}${decimal ? ',' + decimal : ''}`;
};
