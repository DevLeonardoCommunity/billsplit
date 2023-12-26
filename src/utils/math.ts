export const sum = (numbers: (number | undefined)[]) => {
  return numbers.reduce((acc, number) => acc! + (number ?? 0), 0) ?? 0;
};
