import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dropdown } from "primereact/dropdown";
import { Controller, useForm } from "react-hook-form";
import { axios } from "../../../../config/axios";
import { AxiosError, AxiosResponse } from "axios";
import { Cliente } from "../../../ClientePage/models";
import { contentWithInitialName } from "../../EncargadoPage";
import { LibroConAutor } from "../../../LibrosPage/models";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { PrestamoForm } from "../../../PrestamosPage/models";
import { useCreatePrestamo } from "../../hooks/useCreatePrestamo";

export type PrestamoFormProps = {
  // types...
};

const PrestamoForm: React.FC<PrestamoFormProps> = ({}) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PrestamoForm>();
  const { data: clientes } = useQuery<
    AxiosResponse<Cliente[]>,
    AxiosError,
    Cliente[]
  >({
    queryKey: ["clientes"],
    queryFn: () => axios.get("/clientes"),
    select: (data) => data.data,
  });

  const { data: libros } = useQuery<
    AxiosResponse<LibroConAutor[]>,
    AxiosError,
    LibroConAutor[]
  >({
    queryKey: ["libros"],
    queryFn: () => axios.get("/libros"),
    select: (data) => data.data,
  });
  const { mutate: createPrestamoMutation } = useCreatePrestamo();
  const onSubmit = (data: PrestamoForm) => {
    createPrestamoMutation(data, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["prestamos"],
        });
      },
    });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="cliente"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            options={clientes}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder="Seleccione un cliente"
            className="w-full"
            itemTemplate={(cliente) => {
              const Component = contentWithInitialName(cliente.name);

              return <Component />;
            }}
          />
        )}
      />
      <Controller
        name="libro"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            options={libros}
            optionLabel="titulo"
            filter
            showClear
            filterBy="titulo"
            placeholder="Seleccione un libro"
            className="w-full"
          />
        )}
      />
      <div className="flex gap-2 w-full">
        <Controller
          name="dias_prestamo"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              placeholder="Días de prestamo"
              type="number"
              className={classNames("w-full", {
                "p-invalid": errors.dias_prestamo,
              })}
            />
          )}
        />
        <Controller
          name="fecha_prestamo"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <Calendar
              {...field}
              disabled
              placeholder="Fecha de prestamo"
              className="w-full"
            />
          )}
        />
      </div>
      <Button label="Registrar prestamo" type="submit" severity="success" />
    </form>
  );
};

export default PrestamoForm;
