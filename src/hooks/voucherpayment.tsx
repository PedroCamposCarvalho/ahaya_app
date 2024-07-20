import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

interface Voucher {
  percentage: number;
  id_sport: string;
  finalPrice: number;
  created: boolean;
  id_database: string;
}

interface AuthState {
  voucher: Voucher;
}

interface VoucherContextData {
  voucher: Voucher;
  setPercentage(percentage: number, id_sport: string): void;
  setFinalPrice(finalPrice: number): void;
  setCreated(created: boolean): void;
  setIdDatabase(id_database: string): void;
  resetContext(): void;
}

const VoucherContext = createContext<VoucherContextData>(
  {} as VoucherContextData,
);

export const VoucherProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<Voucher>({} as Voucher);

  const setPercentage = useCallback(
    (percentage: number, id_sport: string) => {
      const newData = {
        percentage,
        id_sport,
        finalPrice: 0,
        created: false,
        id_database: data.id_database,
      };
      setData(newData);
    },
    [data.id_database],
  );

  const setFinalPrice = useCallback(
    (finalPrice: number) => {
      const newData = {
        percentage: data.percentage,
        id_sport: data.id_sport,
        finalPrice,
        created: data.created,
        id_database: data.id_database,
      };
      setData(newData);
    },
    [data.percentage, data.id_sport, data.created, data.id_database],
  );

  const setCreated = useCallback(
    (created: boolean) => {
      const newData = {
        percentage: data.percentage,
        id_sport: data.id_sport,
        finalPrice: data.finalPrice,
        created,
        id_database: data.id_database,
      };
      setData(newData);
    },
    [data.percentage, data.id_sport, data.finalPrice, data.id_database],
  );

  const setIdDatabase = useCallback(
    (id_database: string) => {
      const newData = {
        percentage: data.percentage,
        id_sport: data.id_sport,
        finalPrice: data.finalPrice,
        created: data.created,
        id_database,
      };
      setData(newData);
    },
    [data.percentage, data.id_sport, data.finalPrice, data.created],
  );

  const resetContext = useCallback(() => {
    setData({} as Voucher);
  }, []);

  return (
    <VoucherContext.Provider
      value={{
        voucher: data,
        setPercentage,
        setFinalPrice,
        setCreated,
        setIdDatabase,
        resetContext,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
};

export function useVoucher(): VoucherContextData {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
