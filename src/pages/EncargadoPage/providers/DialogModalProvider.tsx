import { useState } from "react";
import {
  DialogModalContextProps,
  dialogModalContext,
} from "../context/dialog-modal-context";
import { Dialog } from "primereact/dialog";

interface DialogModalProviderProps {
  children: React.ReactNode;
}

export const DialogModalProvider: React.FC<DialogModalProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [openChildrenDialog, setOpenChildrenDialog] = useState(false);
  const [title, setTitle] = useState<React.ReactNode | string>("");
  const [content, setContent] = useState<React.ReactNode | string>("");
  const [childrenDialog, setChildrenDialog] =
    useState<Pick<DialogModalContextProps, "title" | "content">>();

  return (
    <dialogModalContext.Provider
      value={{
        open,
        setOpen,
        title,
        setTitle,
        content,
        setContent,
        setChildrenDialog,
        setOpenChildrenDialog,
      }}
    >
      <Dialog
        modal
        header={title}
        visible={open}
        style={{ width: "30%" }}
        onHide={() => {
          setOpen(false);
        }}
      >
        {content}
      </Dialog>
      <Dialog
        modal
        header={childrenDialog?.title}
        visible={openChildrenDialog}
        style={{ minWidth: "50rem" }}
        onHide={() => {
          setOpenChildrenDialog(false);
        }}
      >
        {childrenDialog?.content}
      </Dialog>
      {children}
    </dialogModalContext.Provider>
  );
};
