import React,{useEffect, useState} from 'react'
import {
  OpenRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
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


   const handleScroll = (event) => {
    let headers = document.getElementsByClassName("rt-thead");
    for (let i = 0; i < headers.length; i++) {
      headers[i].scrollLeft = event.target.scrollLeft;
    }
  };

  

   useEffect(() => {
    setData(items)
    //   console.log(items)
  }, []);
  

  return (
    <>
      <div
        style={{
          height: '400px',
          overflow: 'auto',
          width: '100%',
        }}
        className='border border-solid border-gray-200 relative'
      >
        <table  className=" w-full text-left  ">
          <thead className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
              className=''
                style={{
                  position: 'sticky',
                  zIndex: 20,
                  top: 0,
                  backgroundColor: '#f8f3f3',
                }}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    style={{
                      position: 'sticky',
                      top: -10, // Adjust this value as needed
                      zIndex: 1,
                      backgroundColor: '#b3c3d', // This is important, as the sticky header will overlap with content when scrolling
                    }}
                    key={header.id}
                    className="font-normal text-base leading-5 capitalize px-3.5 py-2 border border-solid border-gray-200 "
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                ${i % 2 === 0 ? 'bg-white' : 'bg-white'}
                `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2 ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      </div>
      <div>
        <div
          style={{
            position: 'sticky',
            zIndex: 20,
            top: -10,
            backgroundColor: '#ffffff',
          }}
          className="flex items-center justify-end mt-4 gap-2 px-6 "
        >
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300  disabled:opacity-30 px-4 py-2 font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out"
          >
            {'<'}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300  disabled:opacity-30 px-4 py-2 font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out"
          >
            {'>'}
          </button>

          <span className="flex items-center gap-1">
            <div>Pagina</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} de{' '}
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
    </>
  );
}

export default TableUI