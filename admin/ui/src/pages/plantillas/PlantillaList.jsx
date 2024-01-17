import React, { useState, useEffect } from 'react';
import { DeleteRegular } from '@fluentui/react-icons';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
  useArrowNavigationGroup,
  useFocusableGroup,
} from '@fluentui/react-components';

function PlantillaList({ columns }) {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch data from the API
    fetch(AesaInfo.apiUrl + '/plantillas')
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table
        {...keyboardNavAttr}
        role="grid"
        aria-label="Table with grid keyboard navigation"
        sortable
      >
        <TableHeader as="thead">
          <TableRow
            appearance="none"
            className="border border-solid border-t-[1px] border-r-[0px] border-b-[1px] border-l-[1px]"
          >
            {columns.map((column) => (
              <TableHeaderCell
                key={column.columnKey}
                as="th"
                className="border-l-[1px] border-r-[1px] py-2 w-1/4"
                style={{ width: `${column.size}` }}
              >
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody as="tbody">
          {data.map((item, index) => (
            <TableRow appearance="outline" key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.file}</TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell>{item.modified}</TableCell>
              <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                <TableCellLayout>
                  <Button
                    appearance="subtle"
                    className="mx-4"
                    icon={<DeleteRegular />}
                    aria-label="Editd"
                  />
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PlantillaList;
