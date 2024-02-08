import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import React, { useRef } from "react";
import { useLibroDialog } from "../../hooks/useLibroDialog";
import {
  useAutorDialog,
  useClienteDialog,
  useDialogModalContext,
} from "../../hooks";
import { Toolbar } from "primereact/toolbar";
import { AutorTable } from "../AutorTable";
import { ClienteTable } from "../ClienteTable";

export type HeaderProps = {
  // types...
};

const Header: React.FC<HeaderProps> = () => {
  const menuLeft = useRef<Menu>(null);
  const { openDialogLibro } = useLibroDialog();
  const { setChildrenDialog, setOpenChildrenDialog } = useDialogModalContext();
  const { openDialogAutor } = useAutorDialog();
  const { openDialogCliente } = useClienteDialog();

  const items = [
    {
      label: "Menu de opciones",
      items: [
        {
          label: "Registrar libro",
          icon: "pi pi-plus",
          command: () => openDialogLibro(),
        },
      ],
    },
  ];

  const openAutoresDialog = () => {
    if (setChildrenDialog) {
      setChildrenDialog({
        title: "Autores",
        content: (
          <>
            <Toolbar
              className="mb-1"
              center={
                <Button
                  rounded={false}
                  icon="pi pi-user-plus"
                  tooltip="Registrar autor"
                  tooltipOptions={{ position: "left" }}
                  size="small"
                  onClick={() => openDialogAutor()}
                />
              }
            ></Toolbar>
            <AutorTable />
          </>
        ),
      });
      setOpenChildrenDialog?.(true);
    }
  };

  const openClientesDialog = () => {
    if (setChildrenDialog) {
      setChildrenDialog({
        title: "Clientes",
        content: (
          <>
            <Toolbar
              className="mb-1"
              center={
                <Button
                  rounded={false}
                  icon="pi pi-user-plus"
                  tooltip="Registrar cliente"
                  tooltipOptions={{ position: "left" }}
                  size="small"
                  onClick={() => openDialogCliente()}
                />
              }
            />
            <ClienteTable />
          </>
        ),
      });
      setOpenChildrenDialog?.(true);
    }
  };

  const openPrestamosDialog = () => {
    if (setChildrenDialog) {
      setChildrenDialog({
        title: "Prestamos",
        content: (
          <>
            <Toolbar
              className="mb-1"
              center={
                <Button
                  rounded={false}
                  icon="pi pi-user-plus"
                  tooltip="Registrar prestamo"
                  tooltipOptions={{ position: "left" }}
                  size="small"
                  // onClick={() => openDialogPrestamo()}
                />
              }
            />
          </>
        ),
      });
      setOpenChildrenDialog?.(true);
    }
  };
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
          onClick={() => openAutoresDialog()}
          size="small"
        />
        <Button
          tooltip="Clientes"
          tooltipOptions={{ position: "right" }}
          rounded
          icon="pi pi-users"
          severity="info"
          size="small"
          onClick={() => openClientesDialog()}
        />
        <Button
          tooltip="Prestamos"
          tooltipOptions={{ position: "right" }}
          rounded
          icon="pi pi-book"
          severity="info"
          size="small"
          onClick={() => openPrestamosDialog()}
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

export default Header;
