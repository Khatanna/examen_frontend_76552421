import { useDialogModalContext } from ".";
import { AutorConLibros } from "../../AutoresPage/models";
import { AutorForm } from "../components/AutorForm";

export const useAutorDialog = () => {
  const { setTitle, setOpen, setContent } = useDialogModalContext();

  return {
    openDialogAutor: (autor?: AutorConLibros) => {
      setTitle(
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
        ),
      );
      setContent(<AutorForm autor={autor} />);
      setOpen(true);
    },
  };
};
