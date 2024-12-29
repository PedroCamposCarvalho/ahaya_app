import { SelectedHours } from '@app/interfaces/SelectedHours';
import { HoursProps } from '@app/hooks/appointment';
import UUIDGenerator from 'react-native-uuid-generator';
interface SeparatedCourts {
  court_name: string;
  hours: SelectedHours[];
}

interface TempDates {
  date: Date;
  hours: SelectedHours[];
}

interface SeparatedDates {
  court_name: string;
  dates: TempDates[];
}

interface TempHours {
  date: Date;
  hours: SelectedHours[][];
}

interface SeparatedHours {
  court_name: string;
  dates: TempHours[];
}

function makeid(length: number): string {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function separateCourts(arr: SelectedHours[]): SeparatedCourts[] {
  const separatedCourts: SeparatedCourts[] = [];
  arr.map(item => {
    const index = separatedCourts
      .map(function (e) {
        return e.court_name;
      })
      .indexOf(item.court_name);
    if (index === -1) {
      separatedCourts.push({ court_name: item.court_name, hours: [item] });
    } else {
      separatedCourts[index].hours.push(item);
    }
  });
  return separatedCourts;
}

function separateDates(arr: SeparatedCourts[]): SeparatedDates[] {
  const separatedDates: SeparatedDates[] = [];
  arr.map(item => {
    const dates: TempDates[] = [];
    item.hours.map(hour => {
      const hourDate = new Date(
        hour.year,
        hour.month - 1,
        hour.day,
        0,
        0,
        0,
        0,
      );
      const index = dates
        .map(function (e) {
          return e.date.getDate();
        })
        .indexOf(hourDate.getDate());
      if (index === -1) {
        dates.push({ date: hourDate, hours: [hour] });
      } else {
        dates[index].hours.push(hour);
      }
    });
    separatedDates.push({ court_name: item.court_name, dates });
  });

  return separatedDates;
}

function separateHours(arr: SeparatedDates[]): SeparatedHours[] {
  const separatedHours: SeparatedHours[] = [];
  arr.map(item => {
    item.dates.map(date => {
      const tempHours: TempHours[] = [];
      const sortedHours = date.hours.sort(function (a, b) {
        return a.hour - b.hour;
      });
      let tempSelectedHours: SelectedHours[] = [];
      for (var i = 0; i < sortedHours.length; i++) {
        if (!sortedHours[i + 1]) {
          tempSelectedHours.push(sortedHours[i]);
          tempHours.push({ date: date.date, hours: [tempSelectedHours] });
        } else {
          if (sortedHours[i].hour === sortedHours[i + 1].hour - 1) {
            tempSelectedHours.push(sortedHours[i]);
          } else {
            tempHours.push({ date: date.date, hours: [tempSelectedHours] });
            tempSelectedHours = [];
          }
        }
      }

      separatedHours.push({ court_name: item.court_name, dates: tempHours });
    });
  });
  return separatedHours;
}

function createHoursProps(separatedHours: SeparatedHours[]): HoursProps[] {
  const hoursProps: HoursProps[] = [];
  let index = 0;

  separatedHours.map(item => {
    item.dates.map(date => {
      date.hours.map(hour => {
        const length = hour.length - 1;
        const year = date.date.getFullYear();
        const month = date.date.getMonth();
        const day = date.date.getDate();
        const newItem: HoursProps = {} as HoursProps;
        const initialHour = hour[0].hour;
        const finalHour = hour[length].hour;

        newItem.id = makeid(25);
        newItem.id_court = hour[0].id_court;
        newItem.start_date = new Date(year, month, day, initialHour);
        newItem.finish_date = new Date(year, month, day, finalHour + 1);
        newItem.number_of_players = 0;
        newItem.court_name = hour[0].court_name;
        hoursProps.push(newItem);
      });
    });
  });

  return hoursProps;
}

function sepatateHours(selectedHours: SelectedHours[]): HoursProps[] {
  const separatedCourts = separateCourts(selectedHours);

  const separatedDates = separateDates(separatedCourts);

  const separatedHours = separateHours(separatedDates);

  const hoursProps = createHoursProps(separatedHours);

  return hoursProps;
}

export default sepatateHours;
