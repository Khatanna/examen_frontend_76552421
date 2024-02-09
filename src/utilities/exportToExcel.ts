import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Prestamo } from "../pages/EncargadoPage/components/PrestamosTable/PrestamosTable";
import { Cliente } from "../pages/ClientePage/models";

export const exportToExcelPrestamosVencidos = ({
  data,
}: {
  data: Array<Prestamo>;
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  console.log(data);
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
  console.log(data);
  const exportData = data.map(({ id, name }) => {
    return {
      ["Nro"]: id,
      ["Nombre del cliente"]: name,
      // ["Litulo de libro"]: libro.titulo,
      // ["Nombre del cliente"]: cliente.name,
      // ["Fecha de prestamo"]: new Date(fecha_prestamo).toLocaleDateString(),
      // ["Dias de prestamo"]: `${dias_prestamo} dias`,
      // ["Estado actual"]: estado,
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
