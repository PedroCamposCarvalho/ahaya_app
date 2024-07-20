/* eslint-disable prefer-const */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export interface Store {
  id_product: string;
  product_name: string;
  product_amount: number;
  price: number;
}

interface StoreContextData {
  store: Store[];
  addItem(data: Store): void;
  removeItem(id: string): void;
}

const StoreContext = createContext<StoreContextData>({} as StoreContextData);

export const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<Store[]>([]);

  const addItem = useCallback(
    (data: Store) => {
      let newArray = [...store];
      let found = false;
      newArray.map(item => {
        if (item.id_product === data.id_product) {
          item.product_amount = data.product_amount;
          item.price = data.price;
          found = true;
        }
        return null;
      });
      if (found) {
        setStore(newArray);
      } else {
        setStore([...store, data]);
      }
    },
    [store],
  );

  const removeItem = useCallback(
    (id: string) => {
      const filteredArray = store.filter(item => item.id_product !== id);
      setStore(filteredArray);
    },
    [store],
  );

  return (
    <StoreContext.Provider
      value={{
        store,
        addItem,
        removeItem,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStoreContext(): StoreContextData {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
