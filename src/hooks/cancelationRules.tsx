import api from '@app/services/api';
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface CancelationRule {
  id: string;
  hour: number;
  minutes: number;
  percentage: number;
  active: boolean;
}

interface CancelationRuleProvider {
  cancelationRules: CancelationRule[];
  cancelationRulesLoading: boolean;
}

const CancelationRuleContext = createContext<CancelationRuleProvider>(
  {} as CancelationRuleProvider,
);

export const CancelationRuleProvider: React.FC = ({ children }) => {
  const [cancelationRules, setCancelationRules] = useState<CancelationRule[]>(
    [],
  );
  const [cancelationRulesLoading, setCancelationRulesLoading] = useState(true);

  useEffect(() => {
    api.get('/cancelationRules').then(response => {
      setCancelationRules(response.data);
      setCancelationRulesLoading(false);
    });
  }, []);

  return (
    <CancelationRuleContext.Provider
      value={{
        cancelationRules,
        cancelationRulesLoading,
      }}
    >
      {children}
    </CancelationRuleContext.Provider>
  );
};

export function useCancelationRuleContext(): CancelationRuleProvider {
  const context = useContext(CancelationRuleContext);
  if (!context) {
    throw new Error(
      'useCancelationRuleContext must be used within an CancelationRuleProvider',
    );
  }
  return context;
}
