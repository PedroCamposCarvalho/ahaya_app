export function getDayOfWeekHours(day: number): number[] {
  if (day === 0) {
    return [];
  }
  if (day === 6) {
    return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  }
  if (day === 5) {
    return [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  }
  return [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
}
