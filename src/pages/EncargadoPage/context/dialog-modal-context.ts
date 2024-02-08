import { createContext } from "react";

export interface DialogModalContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: React.ReactNode | string;
  setTitle: (title: React.ReactNode | string) => void;
  content: React.ReactNode | string;
  setContent: (content: React.ReactNode | string) => void;
  childrenDialog?: Omit<DialogModalContextProps, "childrenDialog">;
  openChildrenDialog?: boolean;
  setOpenChildrenDialog?: (open: boolean) => void;
  setChildrenDialog?: (
    childrenDialog: Pick<DialogModalContextProps, "content" | "title">,
  ) => void;
}

export const dialogModalContext = createContext<DialogModalContextProps>({
  open: false,
  setOpen: () => {},
  title: "",
  setTitle: () => {},
  content: "",
  setContent: () => {},
});
