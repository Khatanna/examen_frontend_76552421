import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Paginator } from "primereact/paginator";
import { useRef, useState } from "react";
import { axios } from "../../config/axios";
import { Paginate } from "../../model";
import { buildTimeAgo } from "../../utilities/buildTimeAgo";
import { LibroConAutor } from "../LibrosPage/models";
import { LibroForm } from "./components/LibroForm";
import { useDeleteAutor, useDeleteCliente, useDeleteLibro } from "./hooks";
import { Menu } from "primereact/menu";
import { printJSON } from "../../utilities/print-json";
import { AutorConLibros } from "../AutoresPage/models";
import { Toolbar } from "primereact/toolbar";
import { AutorForm } from "./components/AutorForm";
import { Cliente } from "../ClientePage/models";
import { ClienteForm } from "./components/ClienteForm";

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
  const { data: autores } = useQuery<AxiosResponse<Paginate<AutorConLibros>>>({
    queryKey: ["autores"],
    queryFn: () => {
      return axios.get("/autores", {
        params: {
          limit: 5,
          libros: true,
        },
      });
    },
  });
  const { data: clientes } = useQuery<AxiosResponse<Paginate<Cliente>>>({
    queryKey: ["clientes"],
    queryFn: () => {
      return axios.get("/clientes", {
        params: {
          limit: 5,
          prestamos: true,
        },
      });
    },
  });

  const [expandedRows, setExpandedRows] = useState<LibroConAutor[]>([]);
  const [expandedAutorRows, setExpandedAutorRows] = useState<AutorConLibros[]>(
    [],
  );
  const [showDialog, setShowDialog] = useState(false);
  const [showAutores, setShowAutores] = useState(false);
  const [showClientes, setShowClientes] = useState(false);
  const [showPrestamos, setShowPrestamos] = useState(false);

  const [showAutorDialog, setShowAutorDialog] = useState(false);
  const [showClienteDialog, setShowClienteDialog] = useState(false);
  const [libro, setLibro] = useState<LibroConAutor>();
  const [autor, setAutor] = useState<AutorConLibros>();
  const [cliente, setCliente] = useState<Cliente>();
  const menuLeft = useRef(null);
  const items = [
    {
      label: "Menu de opciones",
      items: [
        {
          label: "Registrar libro",
          icon: "pi pi-plus",
          command: () => setShowDialog(true),
        },
        {
          label: "Registrar autor",
          icon: "pi pi-user-plus",
          command: () => {
            console.log("Registrar autor");
          },
        },
      ],
    },
  ];
  const Header = () => {
    return (
      <div className="flex gap-2 justify-between">
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <div className="flex gap-2">
          <Button
            rounded
            tooltip="Autores"
            tooltipOptions={{ position: "right" }}
            icon="pi pi-user"
            severity="info"
            onClick={() => setShowAutores(true)}
            size="small"
          />
          <Button
            tooltip="Clientes"
            tooltipOptions={{ position: "right" }}
            rounded
            icon="pi pi-users"
            severity="info"
            size="small"
            onClick={() => setShowClientes(true)}
          />
          <Button
            tooltip="Prestamos"
            tooltipOptions={{ position: "right" }}
            rounded
            icon="pi pi-book"
            severity="info"
            size="small"
            onClick={() => setShowPrestamos(true)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            tooltip="Exportar a PDF"
            tooltipOptions={{ position: "left" }}
            icon="pi pi-file-pdf"
            rounded
            className="p-button-danger"
            size="small"
          />
          <Button
            size="small"
            tooltip="Exportar a Excel"
            tooltipOptions={{ position: "left" }}
            icon="pi pi-file-excel"
            rounded
            className="p-button-success"
          />
        </div>
        <Button
          icon="pi pi-bars"
          rounded
          aria-label="Notification"
          size="small"
          aria-controls="popup_menu_left"
          aria-haspopup
          onClick={(event) => menuLeft?.current?.toggle?.(event)}
          tooltip="Menu de opciones"
          tooltipOptions={{ position: "left" }}
        />
      </div>
    );
  };

  const { mutate: deleteLibroMutation, isPending } = useDeleteLibro();
  const { mutate: deleteAutorMutation, isPending: isPedingDeleteAutor } =
    useDeleteAutor();
  const { mutate: deleteClienteMutation, isPending: isPedingDeleteCliente } =
    useDeleteCliente();
  const handleDelete = (id: string) => {
    deleteLibroMutation(id, {
      onSettled() {
        queryClient.invalidateQueries({
          queryKey: ["librosConAutores", page],
        });
      },
    });
  };
  const handleDeleteAutor = (id: number) => {
    deleteAutorMutation(id, {
      onSettled() {
        queryClient.invalidateQueries({
          queryKey: ["autores"],
        });
      },
    });
  };

  const handleDeleteCliente = (id: number) => {
    deleteClienteMutation(id, {
      onSettled() {
        queryClient.invalidateQueries({
          queryKey: ["clientes"],
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

  const handleCloseDialog = () => {
    setShowDialog(false);
    setLibro(undefined);
  };
  const handleCloseAutorDialog = () => {
    setShowAutorDialog(false);
    setAutor(undefined);
  };

  const handleCloseClienteDialog = () => {
    setShowClienteDialog(false);
    setCliente(undefined);
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
        onHide={handleCloseDialog}
      >
        <LibroForm libro={libro} />
      </Dialog>
      <Dialog
        header={
          cliente ? (
            <div className="flex items-center gap-2">
              <i
                className="pi pi-user text-red-500"
                style={{
                  fontSize: "1.4rem",
                }}
              ></i>
              <div>Editar cliente</div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <i
                className="pi pi-user text-red-500"
                style={{
                  fontSize: "1.4rem",
                }}
              ></i>
              <div>Registrar cliente</div>
            </div>
          )
        }
        visible={showClienteDialog}
        style={{ width: "30%" }}
        modal
        onHide={handleCloseClienteDialog}
      >
        <ClienteForm cliente={cliente} />
      </Dialog>
      <Dialog
        header={
          autor ? (
            <div className="flex items-center gap-2">
              <i
                className="pi pi-user text-red-500"
                style={{
                  fontSize: "1.4rem",
                }}
              ></i>
              <div>Editar autor</div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <i
                className="pi pi-user text-red-500"
                style={{
                  fontSize: "1.4rem",
                }}
              ></i>
              <div>Registrar autor</div>
            </div>
          )
        }
        visible={showAutorDialog}
        style={{ width: "30%" }}
        modal
        onHide={handleCloseAutorDialog}
      >
        <AutorForm autor={autor} />
      </Dialog>
      <Dialog
        modal
        visible={showAutores}
        header="Autores"
        onHide={() => {
          setShowAutores(false);
        }}
      >
        <Toolbar
          className="mb-1"
          center={
            <Button
              rounded={false}
              icon="pi pi-user-plus"
              tooltip="Registrar autor"
              tooltipOptions={{ position: "left" }}
              size="small"
              onClick={() => setShowAutorDialog(true)}
            />
          }
        ></Toolbar>
        <DataTable
          size="small"
          value={autores?.data.data}
          tableStyle={{ minWidth: "50rem" }}
          rows={20}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          totalRecords={data?.data.total}
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
                          icon={
                            isPending ? "pi pi-spin pi-spinner" : "pi pi-trash"
                          }
                          tooltip="Eliminar libro"
                          tooltipOptions={{ position: "left" }}
                          onClick={() => {
                            handleDeleteAutor(libro.id);
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
            );
          }}
          collapsedRowIcon="pi pi-caret-right"
          expandedRowIcon="pi pi-caret-down"
          loading={isLoading}
          stripedRows
          // footer={() => (
          //   <Paginator
          //     first={(page - 1) * 20}
          //     rows={data?.data.data.length || 0}
          //     totalRecords={data?.data.total}
          //     onPageChange={(e) => {
          //       setPage(e.page + 1);
          //     }}
          //   />
          // )}
          expandedRows={expandedAutorRows}
          onRowToggle={(e) => setExpandedAutorRows(e.data as AutorConLibros[])}
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
            body={(autor: AutorConLibros) => {
              return (
                <div className="flex gap-2 justify-center">
                  <Button
                    severity="danger"
                    size="small"
                    icon={
                      isPedingDeleteAutor
                        ? "pi pi-spin pi-spinner"
                        : "pi pi-trash"
                    }
                    tooltip="Eliminar autor"
                    tooltipOptions={{ position: "left" }}
                    onClick={() => {
                      handleDeleteAutor(autor.id);
                    }}
                    disabled={isPedingDeleteAutor}
                  />
                  <Button
                    severity="info"
                    size="small"
                    icon="pi pi-pencil"
                    tooltip="Editar libro"
                    onClick={() => {
                      setAutor(autor);
                      setShowAutorDialog(true);
                    }}
                    tooltipOptions={{ position: "left" }}
                  />
                </div>
              );
            }}
          />
        </DataTable>
      </Dialog>
      <Dialog
        modal
        visible={showClientes}
        header="Clientes"
        onHide={() => {
          setShowClientes(false);
        }}
      >
        <Toolbar
          className="mb-1"
          center={
            <Button
              rounded={false}
              icon="pi pi-user-plus"
              tooltip="Registrar cliente"
              tooltipOptions={{ position: "left" }}
              size="small"
              onClick={() => setShowClienteDialog(true)}
            />
          }
        />
        <DataTable
          size="small"
          value={clientes?.data.data}
          tableStyle={{ minWidth: "50rem" }}
          rows={20}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          totalRecords={data?.data.total}
          // rowExpansionTemplate={(autor) => {
          //   if (autor.libros.length === 0) return <div>No tiene libros</div>;
          //   return (
          //     <DataTable
          //       size="small"
          //       value={autor.libros}
          //       tableStyle={{ minWidth: "50rem" }}
          //       collapsedRowIcon="pi pi-caret-right"
          //       expandedRowIcon="pi pi-caret-down"
          //     >
          //       <Column field="id" header="N°" align={"center"} />
          //       <Column field="titulo" header="Titulo" />
          //       <Column
          //         field="lote"
          //         header="N° de lote"
          //         align={"center"}
          //         body={(libro: LibroConAutor) => {
          //           return <Badge value={libro.lote} severity="warning" />;
          //         }}
          //       />
          //       <Column
          //         field="created_at"
          //         header="Fecha de creación"
          //         align={"center"}
          //         body={(libro: LibroConAutor) => (
          //           <Chip
          //             template={contentTimeAgo(
          //               buildTimeAgo(new Date(libro.created_at).getTime()),
          //             )}
          //             className="bg-blue-400 text-white"
          //           />
          //         )}
          //       />
          //       <Column
          //         header="Acciones"
          //         align={"center"}
          //         body={(libro) => {
          //           return (
          //             <div className="flex gap-2 justify-center">
          //               <Button
          //                 severity="danger"
          //                 size="small"
          //                 icon={
          //                   isPending ? "pi pi-spin pi-spinner" : "pi pi-trash"
          //                 }
          //                 tooltip="Eliminar libro"
          //                 tooltipOptions={{ position: "left" }}
          //                 onClick={() => {
          //                   handleDeleteAutor(libro.id);
          //                 }}
          //                 disabled={isPending}
          //               />
          //               <Button
          //                 severity="info"
          //                 size="small"
          //                 icon="pi pi-pencil"
          //                 tooltip="Editar libro"
          //                 onClick={() => {
          //                   setLibro(libro);
          //                   setShowDialog(true);
          //                 }}
          //                 tooltipOptions={{ position: "left" }}
          //               />
          //             </div>
          //           );
          //         }}
          //       />
          //     </DataTable>
          //   );
          // }}
          collapsedRowIcon="pi pi-caret-right"
          expandedRowIcon="pi pi-caret-down"
          loading={isLoading}
          stripedRows
          // footer={() => (
          //   <Paginator
          //     first={(page - 1) * 20}
          //     rows={data?.data.data.length || 0}
          //     totalRecords={data?.data.total}
          //     onPageChange={(e) => {
          //       setPage(e.page + 1);
          //     }}
          //   />
          // )}
          expandedRows={expandedAutorRows}
          onRowToggle={(e) => setExpandedAutorRows(e.data as AutorConLibros[])}
        >
          <Column field="id" header="N°" align={"center"} />
          <Column field="name" header="Nombre" />
          <Column field="email" header="Correo electronico" />
          <Column field="celular" header="Celular" align={"center"} />
          {/* <Column expander header="Libros" align={"center"} /> */}
          <Column
            field="created_at"
            header="Fecha de creación"
            align={"center"}
            body={(cliente: Cliente) => (
              <Chip
                template={contentTimeAgo(
                  buildTimeAgo(new Date(cliente.created_at).getTime()),
                )}
                className="bg-blue-400 text-white"
              />
            )}
          />
          <Column
            header="Acciones"
            align={"center"}
            body={(cliente: Cliente) => {
              return (
                <div className="flex gap-2 justify-center">
                  <Button
                    severity="danger"
                    size="small"
                    icon={
                      isPedingDeleteCliente
                        ? "pi pi-spin pi-spinner"
                        : "pi pi-trash"
                    }
                    tooltip="Eliminar cliente"
                    tooltipOptions={{ position: "left" }}
                    onClick={() => {
                      handleDeleteCliente(cliente.id);
                    }}
                    disabled={isPedingDeleteCliente}
                  />
                  <Button
                    severity="info"
                    size="small"
                    icon="pi pi-pencil"
                    tooltip="Editar cliente"
                    onClick={() => {
                      setCliente(cliente);
                      setShowClienteDialog(true);
                    }}
                    tooltipOptions={{ position: "left" }}
                  />
                </div>
              );
            }}
          />
        </DataTable>
      </Dialog>
      <Dialog
        modal
        visible={showPrestamos}
        header="Prestamos"
        onHide={() => {
          setShowPrestamos(false);
        }}
      >
        {/* <Toolbar
          className="mb-1"
          center={
            <Button
              rounded={false}
              icon="pi pi-user-plus"
              tooltip="Registrar autor"
              tooltipOptions={{ position: "left" }}
              size="small"
              onClick={() => setShowAutorDialog(true)}
            />
          }
        ></Toolbar> */}
        {/* <DataTable
          size="small"
          value={autores?.data.data}
          tableStyle={{ minWidth: "50rem" }}
          rows={20}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          totalRecords={data?.data.total}
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
                          icon={
                            isPending ? "pi pi-spin pi-spinner" : "pi pi-trash"
                          }
                          tooltip="Eliminar libro"
                          tooltipOptions={{ position: "left" }}
                          onClick={() => {
                            handleDeleteAutor(libro.id);
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
            );
          }}
          collapsedRowIcon="pi pi-caret-right"
          expandedRowIcon="pi pi-caret-down"
          loading={isLoading}
          stripedRows
          // footer={() => (
          //   <Paginator
          //     first={(page - 1) * 20}
          //     rows={data?.data.data.length || 0}
          //     totalRecords={data?.data.total}
          //     onPageChange={(e) => {
          //       setPage(e.page + 1);
          //     }}
          //   />
          // )}
          expandedRows={expandedAutorRows}
          onRowToggle={(e) => setExpandedAutorRows(e.data as AutorConLibros[])}
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
            body={(autor: AutorConLibros) => {
              return (
                <div className="flex gap-2 justify-center">
                  <Button
                    severity="danger"
                    size="small"
                    icon={
                      isPedingDeleteAutor
                        ? "pi pi-spin pi-spinner"
                        : "pi pi-trash"
                    }
                    tooltip="Eliminar autor"
                    tooltipOptions={{ position: "left" }}
                    onClick={() => {
                      handleDeleteAutor(autor.id);
                    }}
                    disabled={isPedingDeleteAutor}
                  />
                  <Button
                    severity="info"
                    size="small"
                    icon="pi pi-pencil"
                    tooltip="Editar libro"
                    onClick={() => {
                      setAutor(autor);
                      setShowAutorDialog(true);
                    }}
                    tooltipOptions={{ position: "left" }}
                  />
                </div>
              );
            }}
          />
        </DataTable> */}
      </Dialog>
    </div>
  );
};

export default EncargadoPage;
