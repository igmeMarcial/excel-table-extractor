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
  const determineRowType = (value) => {
    const dataLength = getData().length;
    if (value.rowIndex === 0) {
      return 'header';
    } else if (value.rowIndex === dataLength - 1) {
      return 'total';
    } else {
      return 'body';
    }
  };
  const renderTableRow = (rowData, rowIndex) => {
    const cells = rowData.map((cellData, colIndex) =>
      renderCell(determineRowType(cellData), cellData, rowIndex, colIndex)
    );

    return <tr key={rowIndex}>{cells}</tr>;
  };

  const renderCell = (type, cellData, rowIndex, colIndex) => {
    const { value, rowspan, colspan } = cellData;
    let cellStyle = {
      backgroundColor: '#fff',
      color: '#000',
      borderColor: 'rgb(107, 107, 107)',
    };

    if (type === 'header') {
      cellStyle.backgroundColor = 'rgb(107, 107, 107)';
      cellStyle.color = '#fff';
      cellStyle.borderColor = 'rgb(143, 143, 143)';
    } else if (type === 'total') {
      cellStyle.backgroundColor = 'rgb(232, 232, 232)';
    } else {
      cellStyle.backgroundColor = 'rgb(255, 255, 255)';
    }
    if (colIndex === 0) {
      cellStyle.backgroundColor = 'rgb(255, 255, 255)';
    }

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
      >
        {value}
      </td>
    );
  };

  return renderTable();
}
