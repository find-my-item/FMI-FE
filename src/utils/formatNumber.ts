export function formatNumber(value: number): string {
  if (isNaN(value)) return "0";

  if (value > 9999) {
    return "9,999+";
  }

  return value.toLocaleString("en-US");
}
