import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Badge } from "primereact/badge";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { axios } from "../../../../config/axios";
import { Paginate } from "../../../../model";
import { getTimeAgo } from "../../../../utilities";
import { AutorConLibros } from "../../../AutoresPage/models";
import { LibroConAutor } from "../../../LibrosPage/models";
import { AutorActions } from "../AutorActions";
import { Paginator } from "primereact/paginator";
import { CustomPaginator } from "../../../../components/CustomPaginator";

export type AutorTableProps = {
  // types...
};

const AutorTable: React.FC<AutorTableProps> = () => {
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(0);
  const { data, isLoading } = useQuery<AxiosResponse<Paginate<AutorConLibros>>>(
    {
      queryKey: ["autores", page],
      queryFn: ({ queryKey }) => {
        return axios.get("/autores", {
          params: {
            page: queryKey[1],
            limit: 5,
            libros: true,
          },
        });
      },
    },
  );
  const [expandedRows, setExpandedRows] = useState<AutorConLibros[]>([]);
  return (
    <DataTable
      size="small"
      value={data?.data.data}
      tableStyle={{ minWidth: "50rem" }}
      rows={5}
      rowExpansionTemplate={(autor) => {
        if (autor.libros.length === 0) return <div>No tiene libros</div>;

        return (
          <DataTable
            size="small"
            value={autor.libros}
            tableStyle={{ minWidth: "50rem" }}
            collapsedRowIcon="pi pi-caret-right"
            expandedRowIcon="pi pi-caret-down"
          >
            <Column field="id" header="N°" align={"center"} />
            <Column field="titulo" header="Titulo" />
            <Column
              field="lote"
              header="N° de lote"
              align={"center"}
              body={(libro: LibroConAutor) => {
                return <Badge value={libro.lote} severity="warning" />;
              }}
            />
            <Column
              field="created_at"
              header="Fecha de creación"
              align={"center"}
              body={(libro: LibroConAutor) => (
                <Chip
                  template={getTimeAgo(new Date(libro.created_at).getTime())}
                  className="bg-blue-400 text-white"
                />
              )}
            />
          </DataTable>
        );
      }}
      collapsedRowIcon="pi pi-caret-right"
      expandedRowIcon="pi pi-caret-down"
      loading={isLoading}
      stripedRows
      footer={() => (
        <CustomPaginator
          page={page}
          totalRecords={data?.data.total}
          rows={5}
          onPageChange={(e) => {
            setPage(e.page + 1);
          }}
        />
      )}
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data as AutorConLibros[])}
    >
      <Column field="id" header="N°" align={"center"} />
      <Column field="name" header="Nombre" />
      <Column expander header="Libros" align={"center"} />
      <Column
        field="created_at"
        header="Fecha de creación"
        align={"center"}
        body={(libro: LibroConAutor) => (
          <Chip
            template={getTimeAgo(new Date(libro.created_at).getTime())}
            className="bg-blue-400 text-white"
          />
        )}
      />
      <Column
        header="Acciones"
        align={"center"}
        body={(autor) => <AutorActions autor={autor} />}
      />
    </DataTable>
  );
};

export default AutorTable;
