import React from 'react';
import { AuthProvider } from './auth';
import { VoucherProvider } from './voucherpayment';
import { VoucherNotificationProvicer } from './vouchernotifications';
import { NewSagaProvider } from './newSaga';
import { DayUseProvider } from './dayuse';
import { StoreProvider } from './store';
import { SignUpProvider } from './signup';
import { MonthlyProvider } from './monthly';
import { AppointmentProvider } from './appointment';
import { CourtProvider } from './courts';
import { SportProvider } from './sports';
import { CancelationRuleProvider } from './cancelationRules';
import { ScoreProvider } from './score';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <VoucherNotificationProvicer>
      <VoucherProvider>
        <NewSagaProvider>
          <StoreProvider>
            <SignUpProvider>
              <DayUseProvider>
                <AppointmentProvider>
                  <CourtProvider>
                    <SportProvider>
                      <CancelationRuleProvider>
                        <ScoreProvider>
                          <MonthlyProvider>{children}</MonthlyProvider>
                        </ScoreProvider>
                      </CancelationRuleProvider>
                    </SportProvider>
                  </CourtProvider>
                </AppointmentProvider>
              </DayUseProvider>
            </SignUpProvider>
          </StoreProvider>
        </NewSagaProvider>
      </VoucherProvider>
    </VoucherNotificationProvicer>
  </AuthProvider>
);
export default AppProvider;
