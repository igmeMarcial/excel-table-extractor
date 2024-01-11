import React from 'react'
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
  Button,
  useArrowNavigationGroup,
  useFocusableGroup,
} from "@fluentui/react-components";





function TableUI({items,columns}) {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });

  return (
      <div style={{ overflowX: "auto" }}>
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
                              className="border-l-[1px] border-r-[1px] py-2"
                          >
                              {column.label}
                          </TableHeaderCell>
                      ))}
                  </TableRow>
              </TableHeader>

              <TableBody as="tbody">
                  {items.map((item, index) => (
                      <TableRow appearance="outline" key={index}>
                          <TableCell>{item["N"].label}</TableCell>
                          <TableCell>{item.Componente.label}</TableCell>
                          <TableCell>{item.Indicador.label}</TableCell>
                          <TableCell>
                              {item.UltimaActualizacion.label}
                          </TableCell>
                          <TableCell>{item.Estado.label}</TableCell>
                          <TableCell
                              role="gridcell"
                              tabIndex={0}
                              {...focusableGroupAttr}
                          >
                              <TableCellLayout>
                                  <Button
                                      className="mx-4"
                                      icon={<EditRegular />}
                                      aria-label="Edit"
                                  />
                                  <Button
                                      className="mx-4"
                                      icon={<DeleteRegular />}
                                      aria-label="Delete"
                                  />
                                  <Button
                                      className="mx-4"
                                      icon={<OpenRegular />}
                                      aria-label="Open"
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

export default TableUI