import React,{useEffect, useState} from 'react'
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
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnsTest } from '../utils/data';
import DebouncedInput from './DebouncedInput';
import { makeStyles } from "@fluentui/react-components";



 const useStyles = makeStyles({
    icon:{
      border: 0,
    }
  })

function TableUI({items, isIndicador}) {

  
  const columnHelper = createColumnHelper();

  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });

 
//este const columns debe ser igual su key como en los datos  

//Columnas de la tabla indicadores
 const columns = [
   columnHelper.accessor("N", {
     cell: (info) => <span>{info.row.index + 1}</span>,
     header: "N°",
   }),
   columnHelper.accessor("Componente", {
     cell: (info) => <span>{info.getValue().label}</span>,
     header: "Componente",
   }),
   columnHelper.accessor("Indicador", {
     cell: (info) => <span>{info.getValue().label}</span>,
     header: "Indicador",
   }),
   columnHelper.accessor("UltimaActualizacion", {
     cell: (info) => <span>{info.getValue().label}</span>,
     header: "Ultima actualización",
   }),
   columnHelper.accessor("Estado", {
     cell: (info) => <span>{info.getValue().label}</span>,
     header: "Estado",
   }),
   columnHelper.accessor("Acciones", {
     cell: (info) => (
       <>
         <Button className="mx-4  " appearance='subtle' icon={<OpenRegular className='border-0' />} aria-label="Edit" />
         <Button
           className="mx-4"
           icon={<DeleteRegular />}
           aria-label="Delete"
           appearance='subtle'
         />
         
       </>
     ),
     header: "Acciones",
   }),
 ];
 
 //Columnas de la tabla plantilla



 //constates extras
  const [data, setData] = useState(items);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  

   useEffect(() => {
    setData(items)
    //   console.log(items)
  }, []);
  

  return (
    <div style={{ overflowX: "auto" }}>
      {/* <Table
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
          </Table> */}
        {/* <div className="w-full flex items-center gap-1">
          <EditRegular/>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            placeholder="Search all columns..."
          />
        </div> */}
      <table className="border border-solid border-gray-200 w-full text-left">
        <thead className="bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="font-normal text-base leading-5 capitalize px-3.5 py-2  border border-solid  border-gray-200">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody  className='overflow-y-scroll '>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}    
                className={`
                ${i % 2 === 0 ? "bg-white" : "bg-white"}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3.5 py-2 ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Recoard Found!</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2 px-4 ">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300  disabled:opacity-30 px-4 py-2 font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300  disabled:opacity-30 px-4 py-2 font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out"
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div>Pagina</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Ir a la página:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-transparent"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Ver {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TableUI