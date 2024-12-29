export default (hour: number): string => `${String(hour).padStart(2, '0')}:00`;
