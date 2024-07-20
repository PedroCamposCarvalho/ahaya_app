import React, { createContext, useCallback, useState, useContext } from 'react';

interface DayUse {
  id: string;
  limit: number;
  start_date: Date;
  finish_date: Date;
  price: number;
  tickets: number;
  material_amount: number;
}

interface DayUseContextData {
  dayUse: DayUse;
  setDayUseProps(data: DayUse): void;
  setMaterialAmount(amount: number): void;
  setTicketsAmount(tickets: number): void;
  setPrice(price: number): void;
}

const DayUseContext = createContext<DayUseContextData>({} as DayUseContextData);

export const DayUseProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DayUse>({} as DayUse);

  const setDayUseProps = useCallback((props: DayUse) => {
    setData(props);
  }, []);

  const setPrice = useCallback(
    (price: number) => {
      const {
        id,
        limit,
        start_date,
        finish_date,
        tickets,
        material_amount,
      } = data;
      const newData = {
        id,
        limit,
        start_date: new Date(start_date),
        finish_date: new Date(finish_date),
        price,
        tickets,
        material_amount,
      };
      setData(newData);
    },
    [data],
  );

  const setTicketsAmount = useCallback(
    (tickets: number) => {
      const {
        id,
        limit,
        start_date,
        finish_date,
        price,
        material_amount,
      } = data;
      const newData = {
        id,
        limit,
        start_date: new Date(start_date),
        finish_date: new Date(finish_date),
        price,
        tickets,
        material_amount,
      };
      setData(newData);
    },
    [data],
  );

  const setMaterialAmount = useCallback(
    (amount: number) => {
      const { id, limit, start_date, finish_date, price, tickets } = data;
      const newData = {
        id,
        limit,
        start_date: new Date(start_date),
        finish_date: new Date(finish_date),
        price,
        tickets,
        material_amount: amount,
      };
      setData(newData);
    },
    [data],
  );

  return (
    <DayUseContext.Provider
      value={{
        dayUse: data,
        setDayUseProps,
        setMaterialAmount,
        setTicketsAmount,
        setPrice,
      }}
    >
      {children}
    </DayUseContext.Provider>
  );
};

export function useDayUse(): DayUseContextData {
  const context = useContext(DayUseContext);
  if (!context) {
    throw new Error('useDayUse must be used within an DayUseProvider');
  }
  return context;
}
