/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
import { parseISO } from 'date-fns';

interface SequenceHours {
  hour: number;
  date: number;
  id_court: string;
  court_name: string;
  price: number;
  map?: any;
}

export function validateSSN(cpf: string): boolean {
  let Soma = 0;

  if (cpf === undefined) {
    return false;
  }

  const strCPF = cpf.replace('.', '').replace('.', '').replace('-', '');

  if (
    strCPF === '00000000000' ||
    strCPF === '11111111111' ||
    strCPF === '22222222222' ||
    strCPF === '33333333333' ||
    strCPF === '44444444444' ||
    strCPF === '55555555555' ||
    strCPF === '66666666666' ||
    strCPF === '77777777777' ||
    strCPF === '88888888888' ||
    strCPF === '99999999999' ||
    strCPF.length !== 11
  ) {
    return false;
  }

  for (let i = 1; i <= 9; i += 1) {
    Soma += Number(strCPF.substring(i - 1, i)) * (11 - i);
  }

  let Resto = (Soma * 10) % 11;
  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }

  if (Resto !== Number(strCPF.substring(9, 10))) {
    return false;
  }

  Soma = 0;
  for (let k = 1; k <= 10; k += 1) {
    Soma += Number(strCPF.substring(k - 1, k)) * (12 - k);
  }

  Resto = (Soma * 10) % 11;
  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }

  if (Resto !== Number(strCPF.substring(10, 11))) {
    return false;
  }

  return true;
}

export function IsSequenceHours(data: SequenceHours[]): boolean {
  function sortArray(a: number, b: number): number {
    return a - b;
  }
  if (data.length === 1) {
    return true;
  }
  let newArray: number[] = [];

  data.map((item: SequenceHours) => {
    newArray.push(item.hour);
    return null;
  });

  for (let i = 0; i < newArray.sort(sortArray).length; i++) {
    let initial = Number(newArray[i]);
    let final = Number(newArray[i + 1]);
    if (initial !== final) {
      if (final) {
        if (initial + 1 !== final) return false;
      }
    }
  }

  return true;
}

export function CreateHoursSequences(data: SequenceHours[]): SequenceHours[][] {
  function sortArray(a: SequenceHours, b: SequenceHours): number {
    if (a.hour < b.hour) {
      return -1;
    }
    if (a.hour > b.hour) {
      return 1;
    }
    return 0;
  }
  let sortedArray: SequenceHours[] = [];
  let tempArray: SequenceHours[] = [];
  let arrayReturn: SequenceHours[][] = [];

  data.map((item: SequenceHours) => {
    const index = sortedArray
      .map(function temp(e) {
        return e.hour;
      })
      .indexOf(item.hour);

    if (index === -1) {
      sortedArray.push(item);
      return null;
    }
    return null;
  });

  for (let i = 0; i < sortedArray.sort(sortArray).length; i++) {
    const object = {
      hour: Number(sortedArray[i].hour),
      date: Number(sortedArray[i].date),
      id_court: String(sortedArray[i].id_court),
      court_name: String(sortedArray[i].court_name),
      price: Number(sortedArray[i].price),
    };
    tempArray.push(object);

    try {
      let initial = Number(sortedArray[i].hour);
      let final = Number(sortedArray[i + 1].hour);

      if (initial + 1 !== final) {
        arrayReturn.push(tempArray);
        tempArray = [];
      }
    } catch (error) {
      arrayReturn.push(tempArray);
    }
  }

  return arrayReturn;
}
