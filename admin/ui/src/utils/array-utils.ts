export const getMaxRowLength = (data: any[][]) => {
  return Math.max(...data.map((row) => row.length))
}
