import api from '@app/services/api';
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface Sport {
  id: string;
  id_type: string;
  name: string;
  photo: string;
}

interface SportProvider {
  sports: Sport[];
  sportsLoading: boolean;
}

const SportContext = createContext<SportProvider>({} as SportProvider);

export const SportProvider: React.FC = ({ children }) => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [sportsLoading, setSportsLoading] = useState(true);

  useEffect(() => {
    api.get('/sports/findAll').then(response => {
      setSports(response.data);
      setSportsLoading(false);
    });
  }, []);

  return (
    <SportContext.Provider
      value={{
        sports,
        sportsLoading,
      }}
    >
      {children}
    </SportContext.Provider>
  );
};

export function useSportContext(): SportProvider {
  const context = useContext(SportContext);
  if (!context) {
    throw new Error('useSportContext must be used within an AuthProvider');
  }
  return context;
}
