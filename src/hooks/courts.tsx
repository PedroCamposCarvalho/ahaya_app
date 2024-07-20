/* eslint-disable prefer-const */
import Environment from '@app/Config/Environment';
import api from '@app/services/api';
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface Court {
  id: string;
  courtname: string;
  covered: boolean;
}

interface CourtContextData {
  courts: Court[];
  courtsLoading: boolean;
}

const CourtContext = createContext<CourtContextData>({} as CourtContextData);

export const CourtProvider: React.FC = ({ children }) => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [courtsLoading, setCourtsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/courts/findAll?id_place=${Environment.id_place}`)
      .then(response => {
        setCourts(response.data);
        setCourtsLoading(false);
      });
  }, []);

  return (
    <CourtContext.Provider
      value={{
        courts,
        courtsLoading,
      }}
    >
      {children}
    </CourtContext.Provider>
  );
};

export function useCourtContext(): CourtContextData {
  const context = useContext(CourtContext);
  if (!context) {
    throw new Error('useCourtContext must be used within an AuthProvider');
  }
  return context;
}
