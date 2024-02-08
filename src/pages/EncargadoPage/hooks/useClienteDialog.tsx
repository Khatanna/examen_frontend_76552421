import { useDialogModalContext } from ".";
import { Cliente } from "../../ClientePage/models";
import { ClienteForm } from "../components/ClienteForm";

export const useClienteDialog = () => {
  const { setOpen, setTitle, setContent } = useDialogModalContext();
  return {
    openDialogCliente: (cliente?: Cliente) => {
      setTitle(
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
        ),
      );
      setContent(<ClienteForm cliente={cliente} />);
      setOpen(true);
    },
  };
};
