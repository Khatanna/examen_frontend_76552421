import { useQuery } from "@tanstack/react-query";
import { axios } from "../../config/axios";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { buildTimeAgo } from "../../utilities/buildTimeAgo";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { AxiosResponse } from "axios";
import { Paginate } from "../../model";
import { LibroConAutor } from "../LibrosPage/models";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Badge } from "primereact/badge";
import { Chip } from "primereact/chip";
import { Paginator } from "primereact/paginator";

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
  const [showDialog, setShowDialog] = useState(false);
  const toast = useRef<Toast>(null);
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
  const showRegisterToast = () => {
    if (!toast.current) return;

    toast.current.show({
      severity: "success",
      summary: "Libro registrado",
      detail: "El libro se ha registrado correctamente",
    });
  };

  const handleRegister = () => {
    showRegisterToast();
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
      <Toast ref={toast} />
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
        <Column expander header="Descripción" align={"center"} />
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
          field="autor.name"
          header="autor"
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
          body={(_libro: LibroConAutor) => {
            return (
              <div className="flex gap-2">
                <Button
                  severity="danger"
                  size="small"
                  icon="pi pi-trash"
                  tooltip="Eliminar libro"
                  tooltipOptions={{ position: "left" }}
                />
                <Button
                  severity="info"
                  size="small"
                  icon="pi pi-pencil"
                  tooltip="Editar libro"
                  tooltipOptions={{ position: "left" }}
                />
              </div>
            );
          }}
        />
      </DataTable>
      <Dialog
        visible={showDialog}
        style={{ width: "50%" }}
        modal
        onHide={() => setShowDialog(false)}
        content={({ hide }) => (
          <div
            style={{
              borderRadius: "12px",
              backgroundColor: "white",
            }}
          >
            <form
              className="flex flex-col px-8 py-5 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div
                className="flex 
								gap-2 
							"
              >
                <InputText placeholder="Titulo" className="w-full" autoFocus />
                <InputText placeholder="N° de lote" className="w-full" />
              </div>
              <div>
                <InputTextarea
                  placeholder="Descripción"
                  rows={5}
                  autoResize
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="submit"
                  label="Registrar"
                  severity="success"
                  icon="pi pi-check"
                  size="small"
                  onClick={(e) => {
                    handleRegister();
                    hide(e);
                  }}
                />
                <Button
                  label="Cancelar"
                  icon="pi pi-times"
                  severity="danger"
                  onClick={hide}
                  size="small"
                />
              </div>
            </form>
          </div>
        )}
      />
    </div>
  );
};

export default EncargadoPage;
