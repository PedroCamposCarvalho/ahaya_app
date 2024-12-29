import months from '@app/interfaces/months';

export default (): months[] => {
  const returnObject: months[] = [];

  returnObject.push({ number: 0, name: 'Todos' });
  returnObject.push({ number: 1, name: 'Janeiro' });
  returnObject.push({ number: 2, name: 'Fevereiro' });
  returnObject.push({ number: 3, name: 'Março' });
  returnObject.push({ number: 4, name: 'Abril' });
  returnObject.push({ number: 5, name: 'Maio' });
  returnObject.push({ number: 6, name: 'Junho' });
  returnObject.push({ number: 7, name: 'Julho' });
  returnObject.push({ number: 8, name: 'Agosto' });
  returnObject.push({ number: 9, name: 'Setembro' });
  returnObject.push({ number: 10, name: 'Outubro' });
  returnObject.push({ number: 11, name: 'Novembro' });
  returnObject.push({ number: 12, name: 'Dezembro' });

  return returnObject;
};
