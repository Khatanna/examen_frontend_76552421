import { Button } from "primereact/button";
import { Cliente } from "../../../ClientePage/models";
import { useQueryClient } from "@tanstack/react-query";
import { useClienteDialog, useDeleteCliente } from "../../hooks";

export type ClienteActionsProps = {
  cliente: Cliente;
};

const ClienteActions: React.FC<ClienteActionsProps> = ({ cliente }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteClienteMutation, isPending } = useDeleteCliente();
  const { openDialogCliente } = useClienteDialog();

  const handleDeleteCliente = (id: number) => {
    deleteClienteMutation(id, {
      onSettled() {
        queryClient.invalidateQueries({
          queryKey: ["clientes"],
        });
      },
    });
  };

  return (
    <div className="flex gap-2 justify-center">
      <Button
        severity="danger"
        size="small"
        icon={isPending ? "pi pi-spin pi-spinner" : "pi pi-trash"}
        tooltip="Eliminar cliente"
        tooltipOptions={{ position: "left" }}
        onClick={() => {
          handleDeleteCliente(cliente.id);
        }}
        disabled={isPending}
      />
      <Button
        severity="info"
        size="small"
        icon="pi pi-pencil"
        tooltip="Editar cliente"
        onClick={() => {
          openDialogCliente(cliente);
        }}
        tooltipOptions={{ position: "left" }}
      />
    </div>
  );
};

export default ClienteActions;
