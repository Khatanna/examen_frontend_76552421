import { Controller, useForm } from "react-hook-form";
import { Cliente, ClienteForm } from "../../../ClientePage/models";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCliente, useUpdateCliente } from "../../hooks";

const schema = yup.object({
  name: yup.string().required("El nombre del cliente es un campo obligatorio"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es un campo obligatorio"),
  celular: yup.string().required("El celular es un campo obligatorio"),
});

export type ClienteFormProps = {
  cliente?: Cliente;
};

const ClienteForm: React.FC<ClienteFormProps> = ({ cliente }) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<ClienteForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: cliente?.name || "",
      email: cliente?.email || "",
      celular: cliente?.celular || "",
    },
  });

  const { mutate: createClienteMutation } = useCreateCliente();
  const { mutate: updateClienteMutation } = useUpdateCliente();
  const onSubmit = (data: ClienteForm) => {
    if (cliente) {
      updateClienteMutation(
        { id: cliente.id, ...data },
        {
          onSettled() {
            queryClient.invalidateQueries({
              queryKey: ["clientes"],
            });
          },
        },
      );
    } else {
      createClienteMutation(data, {
        onSettled() {
          queryClient.invalidateQueries({
            queryKey: ["clientes"],
          });
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 flex-col mt-1"
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <InputText {...field} placeholder="Nombre" />
            {fieldState.error && (
              <small className="p-error">{fieldState.error.message}</small>
            )}
          </>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <span className="p-input-icon-left">
              <i className="pi pi-envelope"></i>
              <InputText {...field} placeholder="Email" className="w-full" />
            </span>
            {fieldState.error && (
              <small className="p-error">{fieldState.error.message}</small>
            )}
          </>
        )}
      />
      <Controller
        name="celular"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <span className="p-input-icon-left">
              <i className="pi pi-phone"></i>
              <InputText {...field} placeholder="Celular" className="w-full" />
            </span>

            {fieldState.error && (
              <small className="p-error">{fieldState.error.message}</small>
            )}
          </>
        )}
      />
      <Button
        type="submit"
        severity="success"
        label={cliente ? "Actualizar" : "Registrar"}
      />
    </form>
  );
};

export default ClienteForm;
