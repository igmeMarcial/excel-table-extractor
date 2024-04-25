export const getValidations = (data: any[][] = []) => {
  return Math.max(...data.map((row) => row.length))
}
