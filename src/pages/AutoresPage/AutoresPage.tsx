import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axios } from "../../config/axios";
import { AxiosError, AxiosResponse } from "axios";
import { Autor } from "./models";
import { Paginate } from "../../model";
import { SkeletonPage } from "../../components/SkeletonPage";

export type AutoresPageProps = {
  // types...
};

const AutoresPage: React.FC<AutoresPageProps> = () => {
  const { data, isLoading } = useQuery<
    AxiosResponse<Paginate<Autor>>,
    AxiosError,
    Paginate<Autor>
  >({
    queryKey: ["autores"],
    queryFn: () =>
      axios.get("/autores", {
        params: {
          page: 2,
          limit: 5,
        },
      }),
    select(data) {
      return data.data;
    },
  });

  if (isLoading) {
    return <SkeletonPage />;
  }

  return (
    <div>
      {data?.data.map((autor) => (
        <div key={autor.id} className="bg-orange-600 text-white">
          {autor.name}
        </div>
      ))}
    </div>
  );
};

export default AutoresPage;
