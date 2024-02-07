import React, { useMemo } from "react";
import { axios } from "../../config/axios";
import { Paginate } from "../../model";
import { Libro } from "./models";
import { AxiosResponse } from "axios";
import { SkeletonPage } from "../../components/SkeletonPage";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { DataView } from "primereact/dataview";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProgressSpinner } from "primereact/progressspinner";
const LibrosPage: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    AxiosResponse<Paginate<Libro>>
  >({
    queryKey: ["libros"],
    queryFn: ({ pageParam }) => {
      return axios.get("/libros", {
        params: {
          page: pageParam,
          limit: 100,
        },
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.next_page_url) {
        const url = new URL(lastPage.data.next_page_url);
        const nextPage = url.searchParams.get("page");

        return nextPage ? parseInt(nextPage) : undefined;
      }

      return undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });

  const [value, setValue] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const filterData = (data?: Libro[]) => {
    if (!data) return [];

    if (value === "") return data;
    return data.filter((libro) => {
      return libro.titulo.toLowerCase().includes(value.toLowerCase());
    });
  };

  const books = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.data) || [];
  }, [data]);

  if (isLoading) {
    return <SkeletonPage />;
  }

  return (
    <div className="flex justify-between p-3 gap-3">
      <div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Buscar"
            value={value}
            onChange={handleChange}
          />
        </span>
      </div>
      <InfiniteScroll
        dataLength={books.length}
        next={fetchNextPage}
        hasMore={hasNextPage && books.length > 5}
        loader={
          <div className="w-full my-2 flex justify-center overflow-hidden">
            <ProgressSpinner
              style={{ width: "30px", height: "30px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Ya no se encontraron mas resultados</b>
          </p>
        }
      >
        <DataView
          className="w-full border rounded-md"
          value={filterData(books)}
          itemTemplate={(libro: Libro) => {
            return (
              <div className="p-4 border-1 border-round surface-border surface-card flex justify-between">
                <div className="flex">
                  <div className="mr-2">
                    <Skeleton shape="rectangle" size="12rem"></Skeleton>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 text-lg items-center">
                      <span>Lote:</span>
                      <Badge value={libro.lote} severity={"info"} />
                    </div>
                    <h2
                      className="
									text-2xl
									font-bold
									text-gray-800
									mb-2
								"
                    >
                      {libro.titulo}
                    </h2>
                    <p
                      className="
									text-gray-600
								"
                    >
                      {libro.description}
                    </p>
                    {/* <div
									className="
									text-gray-600
								"
								>
									Nro de lote: {libro.lote}
								</div> */}
                  </div>
                </div>
                <div className="flex items-end">
                  <Button
                    label="Obtener"
                    icon="pi pi-money-bill"
                    size="small"
                  />
                </div>
              </div>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
};

export default LibrosPage;
