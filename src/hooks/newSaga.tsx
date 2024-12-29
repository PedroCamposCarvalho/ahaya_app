import React, { createContext, useCallback, useState, useContext } from 'react';

export interface MaterialsProps {
  id: string;
  material: string;
  amount: number;
  price: number;
}

export interface HourProps {
  hour: number;
  date: number;
  id_court: string;
  court_name: string;
  price: number;
}

interface SequenceHoursProps {
  hours: HourProps[];
  materials: MaterialsProps[];
}

interface NewSagaProps {
  id_sport: string;
  sport_name: string;
  hours: HourProps[];
  materials: MaterialsProps[];
  price: number;
  sequencehours: SequenceHoursProps[];
  hasSequenceHours: boolean;
}

interface NewSagaContextData {
  appointment: NewSagaProps;
  setSportData(id_sport: string, sport_name: string): void;
  setHoursData(hours: HourProps[]): void;
  setMaterialsData(materials: MaterialsProps[]): void;
  setPrice(finalPrice: number): void;
  setSequenceHours(data: SequenceHoursProps[]): void;
}

const NewSagaContext = createContext<NewSagaContextData>(
  {} as NewSagaContextData,
);

export const NewSagaProvider: React.FC = ({ children }) => {
  const [appointment, setAppointment] = useState<NewSagaProps>(
    {} as NewSagaProps,
  );

  const setSportData = useCallback(
    (id_sport: string, sport_name: string) => {
      const {
        hours,
        materials,
        price,
        sequencehours,
        hasSequenceHours,
      } = appointment;

      const newData = {
        id_sport,
        sport_name,
        hours,
        materials,
        price,
        sequencehours,
        hasSequenceHours,
      };
      setAppointment(newData);
    },
    [appointment],
  );

  const setHoursData = useCallback(
    (hours: HourProps[]) => {
      const {
        id_sport,
        sport_name,
        materials,
        price,
        sequencehours,
        hasSequenceHours,
      } = appointment;

      const newData = {
        id_sport,
        sport_name,
        hours,
        materials,
        price,
        sequencehours,
        hasSequenceHours,
      };
      setAppointment(newData);
    },
    [appointment],
  );

  const setMaterialsData = useCallback(
    (materials: MaterialsProps[]) => {
      const { id_sport, sport_name, hours, price, sequencehours } = appointment;

      const newData = {
        id_sport,
        sport_name,
        hours,
        materials,
        price,
        sequencehours,
        hasSequenceHours: false,
      };
      setAppointment(newData);
    },
    [appointment],
  );

  const setPrice = useCallback(
    (finalPrice: number) => {
      const {
        id_sport,
        sport_name,
        hours,
        materials,
        sequencehours,
        hasSequenceHours,
      } = appointment;

      const newData = {
        id_sport,
        sport_name,
        hours,
        materials,
        price: finalPrice,
        sequencehours,
        hasSequenceHours,
      };
      setAppointment(newData);
    },
    [appointment],
  );

  const setSequenceHours = useCallback(
    (data: SequenceHoursProps[]) => {
      const { id_sport, sport_name, hours, materials, price } = appointment;

      const newData = {
        id_sport,
        sport_name,
        hours,
        materials,
        price,
        sequencehours: data,
        hasSequenceHours: true,
      };
      setAppointment(newData);
    },
    [appointment],
  );

  return (
    <NewSagaContext.Provider
      value={{
        appointment,
        setSportData,
        setHoursData,
        setMaterialsData,
        setPrice,
        setSequenceHours,
      }}
    >
      {children}
    </NewSagaContext.Provider>
  );
};

export function useAppointmentContext(): NewSagaContextData {
  const context = useContext(NewSagaContext);
  if (!context) {
    throw new Error(
      'useAppointmentContext must be used within an AppointmentProvider',
    );
  }
  return context;
}
