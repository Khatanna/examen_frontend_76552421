import { useDialogModalContext } from ".";
import { PrestamoForm } from "../components/PrestamoForm";

export const usePrestamoDialog = () => {
  const { setTitle, setOpen, setContent } = useDialogModalContext();
  return {
    openDialogPrestamo: () => {
      setTitle(
        <div className="flex items-center gap-2">
          <i
            className="pi pi-book text-red-500"
            style={{
              fontSize: "1.4rem",
            }}
          ></i>
          <div>Registrar prestamo de libro</div>
        </div>,
      );
      setContent(<PrestamoForm />);
      setOpen(true);
    },
  };
};
