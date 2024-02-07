"use client";
import React, { useMemo } from "react";
import { Libro } from "../../models";
import { Skeleton } from "primereact/skeleton";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { getRandomAction } from "../../../../utilities/get-random-action";

export type LibroListItemProps = {
  libro: Libro;
};

const getBgColor = (state: string) => {
  switch (state) {
    case "Prestar":
      return "bg-green-500";
    case "Devolver":
      return "bg-blue-500";
    case "Reservar":
      return "bg-yellow-500";
    case "Comprar":
      return "bg-purple-500";
    case "Vender":
      return "bg-red-500";
    case "Donar":
      return "bg-indigo-500";
    case "Regalar":
      return "bg-pink-500";
    case "Revisar":
      return "bg-gray-500";
    default:
      return "bg-black";
  }
};

const LibroListItem: React.FC<LibroListItemProps> = ({ libro }) => {
  const action = useMemo(() => getRandomAction(), []);
  const bgColor = getBgColor(action);
  return (
    <div className="surface-border surface-card flex flex-col justify-between w-[12rem]">
      <div className="flex flex-col gap-2">
        <Skeleton
          shape="rectangle"
          width="10rem"
          height="12rem"
          animation="none"
          className={`hover:cursor-pointer grid place-items-center text-balance text-center p-2`}
        >
          <div>{libro.titulo}</div>
        </Skeleton>
        <Button
          className={`w-full ${bgColor} border-0`}
          label={action}
          icon="pi pi-money-bill"
          size="small"
        />
      </div>
    </div>
  );
};

export default LibroListItem;
