import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Badge } from "primereact/badge";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { CustomPaginator } from "../../components/CustomPaginator";
import { axios } from "../../config/axios";
import { Paginate } from "../../model";
import { getTimeAgo } from "../../utilities";
import { LibroConAutor } from "../LibrosPage/models";
import { Header } from "./components/Header";
import { LibroActions } from "./components/LibroActions";

const content = (name: string) => () => {
  return (
    <>
      <span className="bg-blue-400 rounded-full w-[2rem] h-[2rem] flex items-center justify-center text-white p-0 m-0">
        {name[0]}
      </span>
      <span className="ml-2 font-medium">{name}</span>
    </>
  );
};

const EncargadoPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery<AxiosResponse<Paginate<LibroConAutor>>>({
    queryKey: ["librosConAutores", page],
    queryFn: ({ queryKey }) => {
      return axios.get("/libros", {
        params: {
          page: queryKey[1],
          autor: true,
          limit: 20,
        },
      });
    },
  });

  const [expandedRows, setExpandedRows] = useState<LibroConAutor[]>([]);

  return (
    <DataTable
      size="small"
      value={data?.data.data}
      tableStyle={{ minWidth: "50rem" }}
      header={Header}
      rows={20}
      totalRecords={data?.data.total}
      rowExpansionTemplate={(libro) => {
        return <div>{libro.description}</div>;
      }}
      collapsedRowIcon="pi pi-caret-right"
      expandedRowIcon="pi pi-caret-down"
      loading={isLoading}
      stripedRows
      footer={() => (
        <CustomPaginator
          page={page}
          rows={20}
          totalRecords={data?.data.total}
          onPageChange={(e) => {
            setPage(e.page + 1);
          }}
        />
      )}
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data as LibroConAutor[])}
    >
      <Column field="id" header="N°" align={"center"} />
      <Column field="titulo" header="Titulo" />
      <Column expander header="Descripción" align={"center"} />
      <Column
        field="lote"
        header="N° de lote"
        align={"center"}
        body={(libro: LibroConAutor) => {
          return <Badge value={libro.lote} severity="warning" />;
        }}
      />
      <Column
        field="autor.name"
        header="Autor"
        body={(libro: LibroConAutor) => {
          return (
            <Chip
              icon="pi pi-user"
              template={content(libro.autor.name)}
              className="pl-0 pr-3"
            />
          );
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
      <Column
        header="Acciones"
        align={"center"}
        body={(libro) => <LibroActions libro={libro} />}
      />
    </DataTable>
  );
};

export default EncargadoPage;
