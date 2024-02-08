import { useContext } from "react";
import { dialogModalContext } from "../context";

export const useDialogModalContext = () => {
  return useContext(dialogModalContext);
};
