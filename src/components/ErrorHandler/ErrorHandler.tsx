import { Button } from "primereact/button";
import { FallbackProps } from "react-error-boundary";

export type ErrorHandlerProps = FallbackProps;

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col gap-2">
      <div className="bg-blue-200 p-3 rounded text-center">
        <h1 className="text-7xl font-bold">Algo salió mal 😥</h1>
      </div>
      <div className="text-center bg-red-200 p-3 rounded">{error.message}</div>
      <div className="flex gap-2">
        <Button
          tooltip="Recargar la página"
          icon="pi pi-refresh"
          className="p-button-rounded p-button-outlined"
          onClick={() => window.location.reload()}
        />
        <Button
          tooltip="Volver al inicio"
          icon="pi pi-home"
          className="p-button-rounded p-button-outlined"
          onClick={() => (window.location.href = "/")}
        />
      </div>
    </div>
  );
};

export default ErrorHandler;
