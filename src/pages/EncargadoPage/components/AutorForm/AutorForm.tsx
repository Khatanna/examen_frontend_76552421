import { Controller, useForm } from "react-hook-form";
import type { AutorConLibros, AutorForm } from "../../../AutoresPage/models";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { classNames } from "primereact/utils";
import { useCreateAutor, useUpdateAutor } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";

const schema = yup.object({
  name: yup.string().required("El nombre del autor es un campo obligatorio"),
});

export type AutorFormProps = {
  autor?: AutorConLibros;
};

const AutorForm: React.FC<AutorFormProps> = ({ autor }) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<AutorForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: autor?.name || "",
    },
  });
  const { mutate: createAutorMutation } = useCreateAutor();
  const { mutate: updateAutorMutation } = useUpdateAutor();
  const onSubmit = (data: AutorForm) => {
    if (autor) {
      updateAutorMutation(
        {
          id: autor.id,
          ...data,
        },
        {
          onSettled() {
            queryClient.invalidateQueries({
              queryKey: ["autores"],
            });

            queryClient.invalidateQueries({
              queryKey: ["librosConAutores"],
            });
          },
        },
      );
    } else {
      createAutorMutation(data, {
        onSettled() {
          queryClient.invalidateQueries({
            queryKey: ["autores"],
          });
        },
      });
    }
  };

  return (
    <form className="mt-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <InputText
              {...field}
              placeholder="Nombre"
              className={classNames({
                "p-invalid": fieldState.error,
              })}
            />
            {fieldState.error && (
              <small className="p-error">{fieldState.error.message}</small>
            )}
          </>
        )}
      />
      <Button
        label="Guardar"
        className="mt-2"
        type="submit"
        size="small"
        severity="success"
      />
    </form>
  );
};

export default AutorForm;
