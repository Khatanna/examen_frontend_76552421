import { useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { LibroConAutor } from "../../../LibrosPage/models";
import { useDeleteLibro } from "../../hooks";
import { useLibroDialog } from "../../hooks/useLibroDialog";

export type LibroActionsProps = {
  libro: LibroConAutor;
};

const LibroActions: React.FC<LibroActionsProps> = ({ libro }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteLibroMutation, isPending } = useDeleteLibro();
  const { openDialogLibro } = useLibroDialog();
  const handleDeleteLibro = (id: number) => {
    deleteLibroMutation(id, {
      onSettled() {
        queryClient.invalidateQueries({
          queryKey: ["librosConAutores"],
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
        tooltip="Eliminar libro"
        tooltipOptions={{ position: "left" }}
        onClick={() => {
          handleDeleteLibro(libro.id);
        }}
        disabled={isPending}
      />
      <Button
        severity="info"
        size="small"
        icon="pi pi-pencil"
        tooltip="Editar libro"
        onClick={() => {
          openDialogLibro(libro);
        }}
        tooltipOptions={{ position: "left" }}
      />
    </div>
  );
};

export default LibroActions;
