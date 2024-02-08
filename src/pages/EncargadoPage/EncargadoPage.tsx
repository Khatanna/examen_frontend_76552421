import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { axios } from "../../config/axios";
import { Paginate } from "../../model";
import { buildTimeAgo } from "../../utilities/buildTimeAgo";
import { LibroConAutor } from "../LibrosPage/models";
import { LibroForm } from "./components/LibroForm";
import { useDeleteLibro } from "./hooks";

const EncargadoPage: React.FC = () => {
  const queryClient = useQueryClient();
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
  const [showDialog, setShowDialog] = useState(false);
  const [libro, setLibro] = useState<LibroConAutor>();
  const Header = () => {
    return (
      <div className="flex gap-2 justify-end">
        <Button
          severity="success"
          size="small"
          icon="pi pi-plus"
          label="Registrar libro"
          onClick={() => setShowDialog(true)}
        />
      </div>
    );
  };
  const { mutate: deleteLibroMutation, isPending } = useDeleteLibro();

  const handleDelete = (id: string) => {
    deleteLibroMutation(id, {
      onSettled() {
        queryClient.invalidateQueries({
          queryKey: ["librosConAutores", page],
        });
      },
    });
  };

  const content = (name: string) => (
    <>
      <span className="bg-blue-400 rounded-full w-[2rem] h-[2rem] flex items-center justify-center text-white p-0 m-0">
        {name[0]}
      </span>
      <span className="ml-2 font-medium">{name}</span>
    </>
  );

  const contentTimeAgo = (timeAgo: string) => {
    return (
      <div className="flex items-center gap-1 ">
        <i className="pi pi-clock"></i>
        <span>{timeAgo}</span>
      </div>
    );
  };

  return (
    <div>
      <DataTable
        size="small"
        value={data?.data.data}
        tableStyle={{ minWidth: "50rem" }}
        header={Header}
        rows={20}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        totalRecords={data?.data.total}
        rowExpansionTemplate={(libro) => {
          return <div>{libro.description}</div>;
        }}
        collapsedRowIcon="pi pi-caret-right"
        expandedRowIcon="pi pi-caret-down"
        loading={isLoading}
        stripedRows
        footer={() => (
          <Paginator
            first={(page - 1) * 20}
            rows={data?.data.data.length || 0}
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
              template={contentTimeAgo(
                buildTimeAgo(new Date(libro.created_at).getTime()),
              )}
              className="bg-blue-400 text-white"
            />
          )}
        />
        <Column
          header="Acciones"
          align={"center"}
          body={(libro) => {
            return (
              <div className="flex gap-2 justify-center">
                <Button
                  severity="danger"
                  size="small"
                  icon={isPending ? "pi pi-spin pi-spinner" : "pi pi-trash"}
                  tooltip="Eliminar libro"
                  tooltipOptions={{ position: "left" }}
                  onClick={() => {
                    handleDelete(libro.id);
                  }}
                  disabled={isPending}
                />
                <Button
                  severity="info"
                  size="small"
                  icon="pi pi-pencil"
                  tooltip="Editar libro"
                  onClick={() => {
                    setLibro(libro);
                    setShowDialog(true);
                  }}
                  tooltipOptions={{ position: "left" }}
                />
              </div>
            );
          }}
        />
      </DataTable>
      <Dialog
        header={
          libro ? (
            <div className="flex items-center gap-2">
              <i
                className="pi pi-book text-red-500"
                style={{
                  fontSize: "1.4rem",
                }}
              ></i>
              <div>Editar libro</div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <i
                className="pi pi-book text-red-500"
                style={{
                  fontSize: "1.4rem",
                }}
              ></i>
              <div>Registrar libro</div>
            </div>
          )
        }
        visible={showDialog}
        style={{ width: "30%" }}
        modal
        onHide={() => setShowDialog(false)}
      >
        <LibroForm libro={libro} />
      </Dialog>
    </div>
  );
};

export default EncargadoPage;
