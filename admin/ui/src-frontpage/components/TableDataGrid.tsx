type Props = {
  readonly data: any[];
};
export default function TableDataGrid({ data }: Props) {
  const getData = () => {
    return data;
  };
  const renderTable = () => {
    return (
      <table
        style={{
          borderCollapse: 'collapse',
          borderSpacing: '0',
          width: '100%',
          border: 'solid rgb(107, 107, 107) 1px',
        }}
      >
        <tbody>{renderTableRows()}</tbody>
      </table>
    );
  };
  const renderTableRows = () => {
    let data = getData();
    return data.map((rowData, index) => renderTableRow(rowData, index));
  };
  const renderTableRow = (rowData, rowIndex) => {
    const cells = rowData.map((cellData, colIndex) =>
      renderCell(cellData, rowIndex, colIndex)
    );

    return <tr key={rowIndex}>{cells}</tr>;
  };

  const renderCell = (cellData, rowIndex, colIndex) => {
    const { value, rowspan, colspan, typeCell, type } = cellData || {};
    let cellStyle = {
      backgroundColor: '#fff',
      color: '#000',
      borderColor: 'rgb(107, 107, 107)',
    };

    if (typeCell) {
      if (typeCell === 'header') {
        cellStyle.backgroundColor = 'rgb(107, 107, 107)';
        cellStyle.color = '#fff';
        cellStyle.borderColor = 'rgb(143, 143, 143)';
      }
    }
    const className =
      type === 'number' && typeCell === 'body' ? 'text-end' : 'text-start';
    const formattedValue =
      type === 'number' && typeCell === 'body'
        ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        : value;
    return (
      <td
        style={{
          fontSize: '12px',
          border: 'rgb(107, 107, 107) solid 1px',
          fontWeight: '400',
          padding: '4px 8px',
          ...cellStyle,
        }}
        key={`${rowIndex}-${colIndex}`}
        rowSpan={rowspan}
        colSpan={colspan}
        className={className}
      >
        {formattedValue}
      </td>
    );
  };

  return renderTable();
}
