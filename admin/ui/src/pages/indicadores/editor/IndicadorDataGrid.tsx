import { makeStyles } from '@fluentui/react-components';

type Props = {
  readonly data: any[];
};
const useStyles = makeStyles({
  dataGrid: {
    borderCollapse: 'separate',
    borderSpacing: '0',
    '>tr': {
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

function Cell(rowIndex: number, colIndex: number, value: any) {
  return <td>{value}</td>;
}

export default function IndicadorDataGrid({ data }: Props) {
  const classes = useStyles();
  return (
    <table className={classes.dataGrid}>
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
    </table>
  );
}
