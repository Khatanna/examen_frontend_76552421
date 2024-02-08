import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Cliente } from "../../../ClientePage/models";
import { Chip } from "primereact/chip";
import { getTimeAgo } from "../../../../utilities";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Paginate } from "../../../../model";
import { axios } from "../../../../config/axios";
import { useState } from "react";
import { ClienteActions } from "../ClienteActions";
import { CustomPaginator } from "../../../../components/CustomPaginator";

export type ClienteTableProps = {
  // types...
};

const ClienteTable: React.FC<ClienteTableProps> = ({}) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery<AxiosResponse<Paginate<Cliente>>>({
    queryKey: ["clientes", page],
    queryFn: ({ queryKey }) => {
      return axios.get("/clientes", {
        params: {
          page: queryKey[1],
          limit: 5,
          prestamos: true,
        },
      });
    },
  });

  return (
    <DataTable
      size="small"
      value={data?.data.data}
      tableStyle={{ minWidth: "50rem" }}
      rows={20}
      totalRecords={data?.data.total}
      collapsedRowIcon="pi pi-caret-right"
      expandedRowIcon="pi pi-caret-down"
      loading={isLoading}
      stripedRows
      footer={
        <CustomPaginator
          page={page}
          rows={5}
          totalRecords={data?.data.total ?? 0}
          onPageChange={(e) => {
            setPage(e.page + 1);
          }}
        />
      }
      // expandedRows={expandedAutorRows}
      // onRowToggle={(e) => setExpandedAutorRows(e.data as AutorConLibros[])}
    >
      <Column field="id" header="N°" align={"center"} />
      <Column field="name" header="Nombre" />
      <Column field="email" header="Correo electronico" />
      <Column field="celular" header="Celular" align={"center"} />
      <Column
        field="created_at"
        header="Fecha de creación"
        align={"center"}
        body={(cliente: Cliente) => (
          <Chip
            template={getTimeAgo(new Date(cliente.created_at).getTime())}
            className="bg-blue-400 text-white"
          />
        )}
      />
      <Column
        header="Acciones"
        align={"center"}
        body={(cliente: Cliente) => <ClienteActions cliente={cliente} />}
      />
    </DataTable>
  );
};

export default ClienteTable;
