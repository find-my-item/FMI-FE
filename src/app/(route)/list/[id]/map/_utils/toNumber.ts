export const toNumber = (value: string | null, fallback: number): number => {
  if (value === null) return fallback;

  const num = Number(value);
  return isNaN(num) ? fallback : num;
};
