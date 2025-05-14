export const useRandomColor = (): string => {
  const getRandomHex = () => {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, "0")}`;
  };

  return getRandomHex();
};
