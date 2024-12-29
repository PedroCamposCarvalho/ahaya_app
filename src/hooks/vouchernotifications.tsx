import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface VoucherNotification {
  id: number;
  read: boolean;
  id_voucher: string;
}

interface VoucherNotificationContextData {
  notifications: VoucherNotification[];
  setNotification(id_voucher: string): void;
}

const VoucherNotificationContext = createContext<
  VoucherNotificationContextData
>({} as VoucherNotificationContextData);

export const VoucherNotificationProvicer: React.FC = ({ children }) => {
  const [data, setData] = useState<VoucherNotification[]>([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    async function firstCall(): Promise<void> {
      if (
        data
          .map(function temp(e) {
            return e.id_voucher;
          })
          .indexOf('Menu Option') !== -1
      ) {
        const newNotification = {
          id: index,
          read: false,
          id_voucher: 'Menu Option',
        };
        setIndex(index + 1);
        setData([...data, newNotification]);
        await AsyncStorage.setItem('@AB:notifications', JSON.stringify(data));
      }
      const notifications = await AsyncStorage.getItem('@AB:notifications');
    }
    firstCall();
  }, []);

  const setNotification = useCallback(
    async (id_voucher: string) => {
      const newNotification = {
        id: index,
        read: false,
        id_voucher,
      };
      setIndex(index + 1);
      setData([...data, newNotification]);
      await AsyncStorage.setItem('@AB:notifications', JSON.stringify(data));
    },
    [data, index],
  );

  return (
    <VoucherNotificationContext.Provider
      value={{
        notifications: data,
        setNotification,
      }}
    >
      {children}
    </VoucherNotificationContext.Provider>
  );
};

export function useNotificationVoucher(): VoucherNotificationContextData {
  const context = useContext(VoucherNotificationContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
