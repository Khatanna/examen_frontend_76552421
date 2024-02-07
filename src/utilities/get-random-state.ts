export const getRandomState = () => {
  const states = ["Disponible", "Vendido", "Reservado"];
  return states[Math.floor(Math.random() * states.length)];
};
