import { useRef, useEffect, useMemo } from "react";
import { AxiosResponse } from "axios";
import { SkeletonPage } from "../../../../components/SkeletonPage";
import { Paginate } from "../../../../model";
import { Libro } from "../../models";
import { axios } from "../../../../config/axios";
import ScrollContainer from "react-indiana-drag-scroll";
import { LibroListItem } from "../LibroListItem";
import { ProgressSpinner } from "primereact/progressspinner";
import { useInfiniteQuery } from "@tanstack/react-query";

export type LibroSectionProps = {
  title: React.ReactNode;
};

const LibroSection: React.FC<LibroSectionProps> = ({ title }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    AxiosResponse<Paginate<Libro>>
  >({
    queryKey: ["libros"],
    queryFn: ({ pageParam }) => {
      return axios.get("/libros", {
        params: {
          page: pageParam,
          limit: 15,
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

  const filterData = (data?: Libro[]) => {
    if (!data) return [];

    return data;
  };
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const books = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.data) || [];
  }, [data]);

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      root: null,
      rootMargin: "0%", //"100% 0% 100% 0%",
      threshold: 1.0,
    });

    if (spinnerRef.current) {
      observer.observe(spinnerRef.current);
    }

    return () => {
      if (spinnerRef.current) {
        observer.unobserve(spinnerRef.current);
      }
    };
  }, [spinnerRef.current, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <SkeletonPage />;
  }
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex justify-between">
        {title}
        <div>
          Quedan {(data?.pages[0].data.total ?? 0) - books.length} libros por
          cargar
        </div>
      </div>
      <ScrollContainer className="flex gap-3">
        {filterData(books).map((libro) => (
          <LibroListItem libro={libro} />
        ))}
        <div className="flex">
          {hasNextPage ? (
            <div className="ms-4 overflow-hidden my-auto" ref={spinnerRef}>
              <ProgressSpinner
                style={{ width: "30px", height: "30px" }}
                strokeWidth="5"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            </div>
          ) : (
            <p
              style={{ textAlign: "center" }}
              className="p-6 overflow-hidden my-auto"
            >
              <b>Ya no se encontraron mas resultados</b>
            </p>
          )}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default LibroSection;
