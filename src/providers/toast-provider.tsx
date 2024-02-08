import { Toast, ToastProps } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useToastStore } from "../state";

interface ToastProviderProps extends ToastProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  ...props
}) => {
  const ref = useRef<Toast>(null);
  const { setToast, removeToast } = useToastStore();

  useEffect(() => {
    setToast(ref);

    return () => {
      removeToast();
    };
  }, [ref, removeToast, setToast]);

  return (
    <>
      <Toast ref={ref} {...props} />
      {children}
    </>
  );
};
