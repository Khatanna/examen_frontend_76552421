import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import { Paginate } from "../../../../model";
import { CustomPaginator } from "../../../../components/CustomPaginator";
import { Column } from "primereact/column";
import { Chip } from "primereact/chip";
import { getTimeAgo } from "../../../../utilities";
import { axios } from "../../../../config/axios";
import { classNames } from "primereact/utils";
import { contentWithInitialName } from "../../EncargadoPage";
import { Prestamo } from "../../../PrestamosPage/models";
import { Button } from "primereact/button";
import { useRegisterDevolucion } from "../../hooks";

export type PrestamosTableProps = {
  // types...
};

const PrestamosTable: React.FC<PrestamosTableProps> = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery<AxiosResponse<Paginate<Prestamo>>>({
    queryKey: ["prestamos", page],
    queryFn: ({ queryKey }) => {
      return axios.get("/prestamos", {
        params: {
          page: queryKey[1],
          limit: 20,
        },
      });
    },
  });
  const { mutate: registerDevolucionMutation } = useRegisterDevolucion();

  const handleRegisterDevolucion = (id: number) => {
    registerDevolucionMutation(id, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["prestamos"],
        });
      },
    });
  };

  return (
    <DataTable
      size="small"
      value={data?.data.data}
      tableStyle={{ minWidth: "50rem" }}
      rows={20}
      collapsedRowIcon="pi pi-caret-right"
      expandedRowIcon="pi pi-caret-down"
      loading={isLoading}
      stripedRows
      footer={() => (
        <CustomPaginator
          page={page}
          totalRecords={data?.data.total}
          rows={20}
          onPageChange={(e) => {
            setPage(e.page + 1);
          }}
        />
      )}
    >
      <Column field="id" header="N°" align={"center"} />
      <Column
        field="cliente.name"
        header="Cliente"
        body={(prestamo: Prestamo) => {
          return (
            <Chip
              icon="pi pi-user"
              template={contentWithInitialName(prestamo.cliente.name)}
              className="pl-0 pr-3"
            />
          );
        }}
      />
      <Column field="libro.titulo" header="Libro" />
      <Column
        field="fecha_prestamo"
        header="Fecha de prestamo"
        align={"center"}
        body={(prestamo: Prestamo) => (
          <Chip
            template={getTimeAgo(new Date(prestamo.fecha_prestamo).getTime())}
            className="bg-blue-400 text-white"
          />
        )}
      />
      <Column
        field="dias_prestamo"
        header="Dias de prestamo"
        align={"center"}
        body={(prestamo: Prestamo) => (
          <Chip
            label={`${prestamo.dias_prestamo}`}
            className="bg-yellow-500 text-white text-sm"
            icon="pi pi-calendar"
          />
        )}
      />
      <Column
        header="Fecha para devolución"
        align={"center"}
        body={(prestamo: Prestamo) => {
          const fechaPrestamo = new Date(prestamo.fecha_prestamo);
          const fechaDevolucion = new Date(
            fechaPrestamo.setDate(
              fechaPrestamo.getDate() + prestamo.dias_prestamo,
            ),
          );

          return (
            <Chip
              label={`${fechaDevolucion.toLocaleDateString()}`}
              className="bg-blue-500 text-white text-sm"
              icon="pi pi-calendar"
            />
          );
        }}
      />
      <Column
        field="estado"
        header="Estado"
        body={(prestamo: Prestamo) => {
          const isPrestado = prestamo.estado.toLowerCase() === "en prestamo";
          return (
            <div className="flex justify-center">
              <Button
                tooltip={
                  isPrestado
                    ? "En prestamo | Click para registrar devolución"
                    : "Devuelto"
                }
                tooltipOptions={{ position: isPrestado ? "bottom" : "top" }}
                icon={isPrestado ? "pi pi-calendar" : "pi pi-check"}
                rounded
                className={classNames({
                  "bg-green-500": prestamo.estado.toLowerCase() === "devuelto",
                  "bg-orange-500": isPrestado,
                  "text-white border-0": true,
                })}
                onClick={() => {
                  if (prestamo.estado.toLowerCase() === "devuelto") return;

                  handleRegisterDevolucion(prestamo.id);
                }}
              />
            </div>
          );
        }}
      />
    </DataTable>
  );
};

export default PrestamosTable;
