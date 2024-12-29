/* eslint-disable prefer-const */
interface HourProps {
  hour: number;
  date: number;
  id_court: string;
  court_name: string;
  price: number;
}

function SepareteHours(hours: HourProps[]): void {
  let separetedHours = [];
  for (let i = 0; i < hours.length; i++) {
    if (i === 0) {
      const firstItem = {
        hour: hours[i].hour,
        date: hours[i].date,
        id_court: hours[i].id_court,
        court_name: hours[i].court_name,
        price: hours[i].price,
      };
      separetedHours.push(firstItem);
    } else if (i === 1) {
      if (hours[i].id_court === hours[0].id_court) {
        separetedHours.push({
          hour: hours[i].hour,
          date: hours[i].date,
          id_court: hours[i].id_court,
          court_name: hours[i].court_name,
          price: hours[i].price,
        });
      }
    }
  }
}

export default SepareteHours;
