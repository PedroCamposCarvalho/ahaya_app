import React, { createContext, useCallback, useState, useContext } from 'react';

import HoursProps from '../interfaces/MonthlyHoursProps';

interface MonthlyProps {
  id_user: string;
  ids: string[];
  flag: string;
  last_digits: string;
  payment_profile: string;
  final_price: number;
}

interface MonthlyContextData {
  monthly: MonthlyProps;
  setHours(data: string[], final_price: number): void;
  setPaymentData(
    id_user: string,
    flag: string,
    lastDigits: string,
    payment_profile: string,
  ): void;
}

const MonthlyContext = createContext<MonthlyContextData>(
  {} as MonthlyContextData,
);

export const MonthlyProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<MonthlyProps>({} as MonthlyProps);

  const setHours = useCallback(
    (ids: string[], final_price: number) => {
      const existingData = data;
      existingData.ids = ids;
      data.final_price = final_price;
      setData(existingData);
    },
    [data],
  );
  const setPaymentData = useCallback(
    (
      id_user: string,
      flag: string,
      lastDigits: string,
      payment_profile: string,
    ) => {
      const existingData = data;
      data.id_user = id_user;
      data.flag = flag;
      data.last_digits = lastDigits;
      data.payment_profile = payment_profile;
      setData(data);
    },
    [data],
  );

  return (
    <MonthlyContext.Provider
      value={{
        monthly: data,
        setHours,
        setPaymentData,
      }}
    >
      {children}
    </MonthlyContext.Provider>
  );
};

export function useMonthly(): MonthlyContextData {
  const context = useContext(MonthlyContext);
  if (!context) {
    throw new Error('useMonthly must be used within an DayUseProvider');
  }
  return context;
}
