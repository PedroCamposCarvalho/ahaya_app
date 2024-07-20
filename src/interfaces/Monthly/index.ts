interface Monthly {
  id: string;
  id_court: string;
  id_user: string | null;
  week_day: number;
  hour: number;
  renew_date: Date;
}

export default Monthly;
