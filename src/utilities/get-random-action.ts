export const getRandomAction = () => {
  const actions = [
    "Prestar",
    "Devolver",
    "Reservar",
    "Comprar",
    "Vender",
    "Donar",
    "Regalar",
    "Revisar",
  ];
  return actions[Math.floor(Math.random() * actions.length)];
};
