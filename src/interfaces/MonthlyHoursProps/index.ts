export interface AppointmentProps {
  id: string;
  start_date: Date;
}

interface HoursProps {
  id: string;
  id_court: string;
  court_name: string;
  week_day: number;
  hour: number;
  price: number;
  sandbox_product: number;
  production_product: number;
  appointmentInDay: AppointmentProps;
}

export default HoursProps;
