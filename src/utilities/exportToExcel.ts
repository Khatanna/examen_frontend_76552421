import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Cliente } from "../pages/ClientePage/models";
import { Prestamo } from "../pages/PrestamosPage/models";
import { mapMothToName } from ".";

export const exportToExcelPrestamos = ({ data }: { data: Array<Prestamo> }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportData = data.map(
    ({ cliente, dias_prestamo, estado, fecha_prestamo, id, libro }) => {
      return {
        ["Nro"]: id,
        ["Litulo de libro"]: libro.titulo,
        ["Nombre del cliente"]: cliente.name,
        ["Fecha de prestamo"]: new Date(fecha_prestamo).toLocaleDateString(),
        ["Dias de prestamo"]: `${dias_prestamo} dias`,
        ["Estado actual"]: estado,
      };
    },
  );
  const ws = XLSX.utils.json_to_sheet(exportData);
  const sheetName = `Prestamos vencidos`;
  const wb = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], { type: fileType });
  const fileName = `Reporte-${crypto.randomUUID().substring(0, 5)}-${new Date()
    .toISOString()
    .substring(0, 10)}${fileExtension}`;
  saveAs(blob, fileName);
};

export const exportToExcelClientesConPrestamosVencidos = ({
  data,
}: {
  data: Cliente[];
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportData = data.map(({ id, name }) => {
    return {
      ["Nro"]: id,
      ["Nombre del cliente"]: name,
    };
  });
  const ws = XLSX.utils.json_to_sheet(exportData);
  const sheetName = `Prestamos vencidos clientes`;
  const wb = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], { type: fileType });
  const fileName = `Reporte-${crypto.randomUUID().substring(0, 5)}-${new Date()
    .toISOString()
    .substring(0, 10)}${fileExtension}`;
  saveAs(blob, fileName);
};

type GrouByYearMothAndWeek = {
  year: number;
  month: number;
  week: number;
  count: number;
};

export const exportToExcelGroupByYearMonthAndWeek = ({
  data,
}: {
  data: GrouByYearMothAndWeek[];
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  console.log(data);
  const exportData = data.map(({ count, month, week, year }, index) => {
    return {
      ["Nro"]: index + 1,
      ["Año"]: year,
      ["Mes"]: mapMothToName[month - 1],
      ["Semana"]: week,
      ["Cantidad de prestamos"]: count,
    };
  });
  const ws = XLSX.utils.json_to_sheet(exportData);
  const sheetName = `Prestamos agrupados por fecha`;
  const wb = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], { type: fileType });
  const fileName = `Reporte-${crypto.randomUUID().substring(0, 5)}-${new Date()
    .toISOString()
    .substring(0, 10)}${fileExtension}`;
  saveAs(blob, fileName);
};
