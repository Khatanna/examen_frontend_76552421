import { Paginator, PaginatorProps } from "primereact/paginator";

export type CustomPaginatorProps = PaginatorProps & {
  page: number;
};

const CustomPaginator: React.FC<CustomPaginatorProps> = ({
  totalRecords,
  onPageChange,
  page,
  rows,
}) => {
  return (
    <Paginator
      template={{
        layout:
          "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink",
      }}
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      first={(page - 1) * (rows ?? 0)}
      rows={rows}
      totalRecords={totalRecords}
      onPageChange={onPageChange}
    />
  );
};

export default CustomPaginator;
