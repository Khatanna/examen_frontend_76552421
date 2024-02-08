import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Controller, FieldPath, useForm } from "react-hook-form";
import * as yup from "yup";
import { axios } from "../../../../config/axios";
import { Autor } from "../../../AutoresPage/models";
import { LibroConAutor, LibroForm } from "../../../LibrosPage/models";
import { useCreateLibro } from "../../hooks/useCreateLibro";
import { useUpdateLibro } from "../../hooks";

const schema = yup.object().shape({
  titulo: yup.string().required("El titulo es requerido"),
  lote: yup.string().required("El número de lote es requerido"),
  description: yup.string().required("La descripción es requerida"),
  autor: yup.object().shape({
    id: yup.number().required("El autor es requerido"),
    name: yup.string().required("El autor es requerido"),
  }),
});

interface LibroFormProps {
  libro?: LibroConAutor;
}

const LibroForm: React.FC<LibroFormProps> = ({ libro }) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getFieldState,
  } = useForm<LibroForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      titulo: libro?.titulo ?? "",
      lote: libro?.lote ?? "",
      description: libro?.description ?? "",
      autor: libro?.autor,
    },
  });
  const { data: autores } = useQuery<
    AxiosResponse<Autor[]>,
    AxiosError,
    Autor[]
  >({
    queryKey: ["autoresOnlyName"],
    queryFn: () => {
      return axios.get("/autores");
    },
    select: (data) => {
      return data.data;
    },
  });
  const { mutate: createLibroMutation } = useCreateLibro();
  const { mutate: updateLibroMutation } = useUpdateLibro();
  const onSubmit = (data: LibroForm) => {
    if (libro) {
      updateLibroMutation(
        {
          ...libro,
          ...data,
        },
        {
          onSettled() {
            queryClient.invalidateQueries({
              queryKey: ["librosConAutores"],
            });
          },
        },
      );
    } else {
      createLibroMutation(data, {
        onSettled() {
          queryClient.invalidateQueries({
            queryKey: ["librosConAutores"],
          });
        },
      });
    }
  };

  const getFormErrorMessage = (name: FieldPath<LibroForm>) => {
    return (
      getFieldState(name).error && (
        <small className="p-error">{getFieldState(name).error?.message}</small>
      )
    );
  };

  return (
    <form
      className="flex flex-col gap-4 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="flex gap-4 
	"
      >
        <Controller
          control={control}
          name="titulo"
          render={({ field }) => (
            <div className="w-full">
              <InputText
                placeholder="Titulo"
                {...field}
                className={classNames("w-full", {
                  "p-invalid": errors.titulo,
                })}
              />
              {getFormErrorMessage("titulo")}
            </div>
          )}
        />
        <Controller
          control={control}
          name="lote"
          render={({ field }) => (
            <div className="w-full">
              <InputText
                placeholder="N° de lote"
                {...field}
                className={classNames("w-full", {
                  "p-invalid": errors.lote,
                })}
              />
              {getFormErrorMessage("lote")}
            </div>
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <div className="w-full">
              <InputTextarea
                placeholder="Descripción"
                className={classNames("w-full", {
                  "p-invalid": errors.description,
                })}
                rows={7}
                {...field}
              />
              {getFormErrorMessage("description")}
            </div>
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="autor"
          render={({ field }) => (
            <div className="w-full ">
              <Dropdown
                {...field}
                className={classNames("w-full", {
                  "p-invalid": errors.autor,
                })}
                focusInputRef={field.ref}
                id={field.name}
                onChange={(e) => {
                  field.onChange(e.value);
                }}
                itemTemplate={(option: Autor) => {
                  return (
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-400 rounded-full w-[2rem] h-[2rem] flex items-center justify-center text-white p-0 m-0">
                        {option.name[0]}
                      </span>
                      <span>{option.name}</span>
                    </div>
                  );
                }}
                options={autores}
                optionLabel="name"
                placeholder="Autor"
              />
              {getFormErrorMessage("autor.name")}
            </div>
          )}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          label={libro ? "Actualizar" : "Registrar"}
          severity="success"
          icon="pi pi-check"
          size="small"
        />
      </div>
    </form>
  );
};

export default LibroForm;
