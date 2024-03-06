import styled from '@emotion/styled/types/base';
import { makeStyles } from '@fluentui/react-components';

type Props = {
  readonly data: any[];
};







export default function TableDataGrid({ data }: Props) {


  const getData = () =>{
    return data;
  }
  const renderTable = ()=> {
    return(
      <table >
          <tbody>{renderTableRows()}</tbody>
      </table>
    )
  }
  const renderTableRows = () => {
    let data = getData();
      // headerRowsCount = me.getTableHeaderRowsCount(),
      // totalsRowsCount = me.hasRowTotals() ? me.getTableTotalsRowsCount() : 0;

      return data.map((rowData, index) => (
      <tr key={index}>
        {/* Aquí renderizas las celdas de cada fila */}
      </tr>
    ));
  }


  console.log(data)


  return (
    <table style={{ borderCollapse: 'separate', borderSpacing: '0', width: '100%' }}>
      
    </table>
  );
}
