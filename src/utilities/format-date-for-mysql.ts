export const formatDateForMySQL = (fecha: Date) => {
  const año = fecha.getFullYear();
  const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
  const dia = ("0" + fecha.getDate()).slice(-2);
  const horas = ("0" + fecha.getHours()).slice(-2);
  const minutos = ("0" + fecha.getMinutes()).slice(-2);
  const segundos = ("0" + fecha.getSeconds()).slice(-2);

  return (
    año + "-" + mes + "-" + dia + " " + horas + ":" + minutos + ":" + segundos
  );
};
