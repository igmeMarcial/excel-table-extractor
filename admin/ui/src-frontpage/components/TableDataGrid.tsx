import styled from '@emotion/styled/types/base';
import { makeStyles } from '@fluentui/react-components';

type Props = {
  readonly data: any[];
};

const useStyles = makeStyles({
  dataGrid: {
    borderCollapse: 'separate',
    borderSpacing: '0',
    width: '100%',
    '> tbody >tr': {
      ':first-child': {
        '>td': {
          'border-top-width': '2px',
          backgroundColor: 'rgb(107, 107, 107)',
          color: '#fff',
        },
        '>td:first-child': {
          backgroundColor: 'rgb(107, 107, 107)',
          color: '#fff',
        },
      },
      ':last-child': {
        backgroundColor: 'rgb(232, 232, 232)',
        fontSize: '12px',
        fontWeight: '600',

        '>td:first-child': {
          backgroundColor: 'rgb(232, 232, 232)',
          fontSize: '12px',
          fontWeight: '600',
        },
      },
      '>td': {
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingLeft: '8px',
        paddingRight: '8px',
        'border-width': '0 2px 2px 0',
        'border-color': 'rgb(143, 143, 143)',
        'border-style': 'solid',
        ':first-child': {
          'border-left-width': '2px',
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

function Cell(rowIndex: number, colIndex: number, value: any) {
    const formattedValue = typeof value === 'number' ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : value;
    const className = typeof value === 'number' ? 'text-end' : '';
  return <td key={`cell-${rowIndex}-${colIndex}`} className={className}>{formattedValue}</td>;
}

export default function TableDataGrid({ data }: Props) {
  const classes = useStyles();
  return (
    <table className={classes.dataGrid}>
      <tbody>
        <tr>{data[0].map((value, colIndex) => Cell(0, colIndex, value))}</tr>
        {data.slice(1, -1).map((itemRow, rowIndex) => (
          <tr key={`C${itemRow}-F${rowIndex}`}>
            {itemRow.map((value, colIndex) => Cell(0, colIndex, value))}
          </tr>
        ))}
        <tr>
          {data[data.length - 1].map((value, colIndex) =>
            Cell(0, colIndex, value)
          )}
        </tr>
      </tbody>
    </table>
  );
}
