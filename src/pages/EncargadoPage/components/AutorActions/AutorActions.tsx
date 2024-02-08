import { useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { memo } from "react";
import { AutorConLibros } from "../../../AutoresPage/models";
import { useAutorDialog, useDeleteAutor } from "../../hooks";

export type AutorActionsProps = {
  autor: AutorConLibros;
};

const AutorActions: React.FC<AutorActionsProps> = memo(({ autor }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteAutorMutation, isPending } = useDeleteAutor();
  const { openDialogAutor } = useAutorDialog();
  const handleDeleteAutor = (id: number) => {
    deleteAutorMutation(id, {
      onSettled() {
        queryClient.invalidateQueries({
          queryKey: ["autores"],
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
        tooltip="Eliminar autor"
        tooltipOptions={{ position: "left" }}
        onClick={() => {
          handleDeleteAutor(autor.id);
        }}
        disabled={isPending}
      />
      <Button
        severity="info"
        size="small"
        icon="pi pi-pencil"
        tooltip="Editar autor"
        onClick={() => {
          openDialogAutor(autor);
        }}
        tooltipOptions={{ position: "left" }}
      />
    </div>
  );
});

export default AutorActions;
