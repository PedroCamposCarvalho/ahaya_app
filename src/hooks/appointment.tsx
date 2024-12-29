import React, { createContext, useCallback, useState, useContext } from 'react';

export interface MaterialsProps {
  id: string;
  id_hour: string;
  identifier: string;
  material: string;
  amount: number;
  price: number;
}

export interface HoursProps {
  id: string;
  id_court: string;
  start_date: Date;
  finish_date: Date;
  number_of_players: number;
  court_name: string;
}

export interface AppointmentProps {
  id_sport: string;
  id_place: string;
  sport_name: string;
  finalPrice: number;
  id_transaction: string;
  id_user: string;
  user_name: string;
  email: string;
  paid: boolean;
  priceToPay: number;
  points: number;
  winningPoints: number;
}

interface AppointmentContextData {
  appointment: AppointmentProps;
  hours: HoursProps[];
  materials: MaterialsProps[];
  setSportData(id_sport: string, sport_name: string): void;
  setHoursData(
    hours: HoursProps[],
    finalPrice: number,
    winningPoints: number,
  ): void;
  setHoursMaterials(hourMaterials: MaterialsProps[]): void;
  addMaterial(id_hour: string, id_material: string): void;
  removeMaterial(id_hour: string, id_material: string): void;
  addPlayer(id_hour: string): void;
  removePlayer(id_hour: string): void;
  setIdTransactionAndUserData(
    id_transaction: string,
    id_user: string,
    id_place: string,
    user_name: string,
    email: string,
  ): void;
  setPriceToPayAndPoints(priceToPay: number, points: number): void;
}

const AppointmentContext = createContext<AppointmentContextData>(
  {} as AppointmentContextData,
);

export const AppointmentProvider: React.FC = ({ children }) => {
  const [appointment, setAppointment] = useState<AppointmentProps>(
    {} as AppointmentProps,
  );
  const [hours, setHours] = useState<HoursProps[]>([]);
  const [materials, setMaterials] = useState<MaterialsProps[]>([]);

  const setSportData = useCallback(
    (id_sport: string, sport_name: string) => {
      const {
        finalPrice,
        id_transaction,
        id_user,
        id_place,
        user_name,
        email,
        paid,
        points,
        priceToPay,
        winningPoints,
      } = appointment;

      const newData = {
        id_sport,
        id_place,
        sport_name,
        finalPrice,
        id_transaction,
        id_user,
        user_name,
        email,
        paid,
        points,
        priceToPay,
        winningPoints,
      };
      setAppointment(newData);
    },
    [appointment],
  );

  const setHoursData = useCallback(
    (newHours: HoursProps[], finalPrice: number, winningPoints: number) => {
      const {
        id_sport,
        id_place,
        sport_name,
        id_transaction,
        id_user,
        user_name,
        email,
        paid,
        points,
        priceToPay,
      } = appointment;

      const newData = {
        id_sport,
        id_place,
        sport_name,
        finalPrice,
        id_transaction,
        id_user,
        user_name,
        email,
        paid,
        points,
        priceToPay,
        winningPoints,
      };
      setHours(newHours);
      setAppointment(newData);
    },
    [appointment],
  );

  const setHoursMaterials = useCallback((hourMaterials: MaterialsProps[]) => {
    setMaterials(hourMaterials);
  }, []);

  const addMaterial = useCallback(
    (id_hour: string, id_material: string) => {
      const tempMaterials = materials;
      const {
        id_sport,
        id_place,
        sport_name,
        finalPrice,
        id_transaction,
        id_user,
        user_name,
        email,
        paid,
        points,
        priceToPay,
        winningPoints,
      } = appointment;

      tempMaterials
        .filter(item => item.id_hour === id_hour)
        .filter(material => material.id === id_material)[0].amount += 1;

      setMaterials(tempMaterials);
      let materialsPrice = 0;
      tempMaterials.map(item => {
        if (item.amount > 0) {
          materialsPrice += Number(item.price);
        }
        return null;
      });

      const newData = {
        id_sport,
        id_place,
        sport_name,
        finalPrice: finalPrice + materialsPrice,
        id_transaction,
        id_user,
        user_name,
        email,
        paid,
        points,
        priceToPay,
        winningPoints,
      };
      setAppointment(newData);
    },
    [materials, appointment],
  );

  const removeMaterial = useCallback(
    (id_hour: string, id_material: string) => {
      const tempMaterials = materials;
      const {
        id_sport,
        id_place,
        sport_name,
        finalPrice,
        id_transaction,
        id_user,
        user_name,
        email,
        paid,
        points,
        priceToPay,
        winningPoints,
      } = appointment;

      let materialsPrice = 0;
      tempMaterials.map(item => {
        if (item.amount > 0) {
          materialsPrice += Number(item.price);
        }
        return null;
      });

      tempMaterials
        .filter(item => item.id_hour === id_hour)
        .filter(material => material.id === id_material)[0].amount -= 1;

      setMaterials(tempMaterials);

      const newData = {
        id_sport,
        id_place,
        sport_name,
        finalPrice: finalPrice - materialsPrice,
        id_transaction,
        id_user,
        user_name,
        email,
        paid,
        points,
        priceToPay,
        winningPoints,
      };
      setAppointment(newData);
    },
    [materials, appointment],
  );

  const addPlayer = useCallback(
    (id_hour: string) => {
      const tempHours = hours;
      tempHours.filter(item => item.id === id_hour)[0].number_of_players += 1;
      setHours(tempHours);
    },
    [hours],
  );

  const removePlayer = useCallback(
    (id_hour: string) => {
      const tempHours = hours;
      if (
        tempHours.filter(item => item.id === id_hour)[0].number_of_players > 0
      ) {
        tempHours.filter(item => item.id === id_hour)[0].number_of_players -= 1;
      }
      setHours(tempHours);
    },
    [hours],
  );

  const setIdTransactionAndUserData = useCallback(
    (
      id_transaction: string,
      id_user: string,
      id_place: string,
      user_name: string,
      email: string,
    ) => {
      const {
        id_sport,
        sport_name,
        finalPrice,
        points,
        priceToPay,
        winningPoints,
      } = appointment;

      const newData = {
        id_sport,
        id_place,
        sport_name,
        finalPrice,
        id_transaction,
        id_user,
        user_name,
        email,
        paid: true,
        points,
        priceToPay,
        winningPoints,
      };
      setAppointment(newData);
    },
    [appointment],
  );

  const setPriceToPayAndPoints = useCallback(
    (priceToPay: number, points: number) => {
      const {
        id_sport,
        id_place,
        sport_name,
        finalPrice,
        id_transaction,
        id_user,
        user_name,
        email,
        paid,
        winningPoints,
      } = appointment;

      const newData = {
        id_sport,
        id_place,
        sport_name,
        finalPrice,
        id_transaction,
        id_user,
        user_name,
        email,
        paid,
        priceToPay,
        points,
        winningPoints,
      };

      setAppointment(newData);
    },
    [appointment],
  );

  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        hours,
        materials,
        setSportData,
        setHoursData,
        setHoursMaterials,
        addMaterial,
        removeMaterial,
        addPlayer,
        removePlayer,
        setIdTransactionAndUserData,
        setPriceToPayAndPoints,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export function useAppointmentContext(): AppointmentContextData {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      'useAppointmentContext must be used within an AppointmentProvider',
    );
  }
  return context;
}
