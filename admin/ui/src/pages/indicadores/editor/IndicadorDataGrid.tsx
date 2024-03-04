import { makeStyles } from '@fluentui/react-components';
import { DataCell } from '../../../types/DataCell';

type Props = {
  readonly data: any[];
};

const useStyles = makeStyles({
  dataGrid: {
    position: 'absolute',
    borderCollapse: 'separate',
    borderSpacing: '0',
    width: '100%',
    '> tbody >tr': {
      ':first-child': {
        '>td': {
          'border-top-width': '1px',
          backgroundColor: '#f5f5f5',
        },
      },
      '>td': {
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingLeft: '8px',
        paddingRight: '8px',
        'border-width': '0 1px 1px 0',
        'border-color': '#e0e0e0',
        'border-style': 'solid',
        ':first-child': {
          'border-left-width': '1px',
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
});

function Cell(cell: DataCell, rowIndex: number, colIndex: number) {
  return (
    <td key={colIndex} colSpan={cell.colspan} rowSpan={cell.rowspan}>
      {cell.value}
    </td>
  );
}

export default function IndicadorDataGrid({ data }: Props) {
  const classes = useStyles();

  return (
    <table className={classes.dataGrid}>
      <tbody>
        <tr>{data[0].map((cell, colIndex) => Cell(cell, 0, colIndex))}</tr>
        {data.slice(1, -1).map((itemRow, rowIndex) => (
          <tr key={`C${itemRow}-F${rowIndex}`}>
            {itemRow.map((cell, colIndex) => Cell(cell, 0, colIndex))}
          </tr>
        ))}
        <tr>
          {data[data.length - 1].map((cell, colIndex) =>
            Cell(cell, 0, colIndex)
          )}
        </tr>
      </tbody>
    </table>
  );
}
