import DayOfWeek from '../interfaces/DayOfWeek';

export default (): DayOfWeek[] => {
  const dayOfWeekList: DayOfWeek[] = [];

  dayOfWeekList.push({ number: 0, label: 'Domingo' });
  dayOfWeekList.push({ number: 1, label: 'Segunda' });
  dayOfWeekList.push({ number: 2, label: 'Terça' });
  dayOfWeekList.push({ number: 3, label: 'Quarta' });
  dayOfWeekList.push({ number: 4, label: 'Quinta' });
  dayOfWeekList.push({ number: 5, label: 'Sexta' });
  dayOfWeekList.push({ number: 6, label: 'Sábado' });

  return dayOfWeekList;
};
