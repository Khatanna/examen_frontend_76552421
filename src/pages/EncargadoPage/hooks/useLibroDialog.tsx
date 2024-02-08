import { useDialogModalContext } from ".";
import { LibroConAutor } from "../../LibrosPage/models";
import { LibroForm } from "../components/LibroForm";

export const useLibroDialog = () => {
  const { setTitle, setOpen, setContent } = useDialogModalContext();
  return {
    openDialogLibro: (libro?: LibroConAutor) => {
      setTitle(
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
        ),
      );
      setContent(<LibroForm libro={libro} />);
      setOpen(true);
    },
  };
};
