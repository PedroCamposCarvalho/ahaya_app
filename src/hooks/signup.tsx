import React, { createContext, useCallback, useState, useContext } from 'react';

interface SignUpProps {
  name: string;
  email: string;
  ssn: string;
  cellphone: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  password: string;
}

interface FirstData {
  name: string;
  email: string;
  ssn: string;
  cellphone: string;
}

interface AddressData {
  zipCode: string;
  street: string;
  number?: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
}

interface SignUpContextData {
  signUp: SignUpProps;
  setFirstData(data: FirstData): void;
  setAddress(data: AddressData): void;
  setFinalData(data: AddressData): void;
  setPassword(password: string): void;
  resetHook(): void;
}

const SignUpContext = createContext<SignUpContextData>({} as SignUpContextData);

export const SignUpProvider: React.FC = ({ children }) => {
  const [signUp, setSignUp] = useState<SignUpProps>({} as SignUpProps);

  const setFirstData = useCallback((data: FirstData) => {
    const { name, email, ssn, cellphone } = data;
    setSignUp({
      name,
      email,
      ssn,
      cellphone,
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: '',
      country: '',
      password: '',
    });
  }, []);

  const setAddress = useCallback(
    (data: AddressData) => {
      const { name, email, ssn, cellphone } = signUp;
      const { zipCode, street, district, city, state } = data;
      setSignUp({
        name,
        email,
        ssn,
        cellphone,
        zipCode,
        street,
        number: '',
        complement: '',
        district,
        city,
        state,
        country: 'Brazil',
        password: '',
      });
    },
    [signUp],
  );

  const setFinalData = useCallback(
    (data: AddressData) => {
      const { name, email, ssn, cellphone } = signUp;
      const {
        zipCode,
        street,
        number,
        complement,
        district,
        city,
        state,
      } = data;
      if (number && complement) {
        setSignUp({
          name,
          email,
          ssn,
          cellphone,
          zipCode,
          street,
          number,
          complement,
          district,
          city,
          state,
          country: 'Brazil',
          password: '',
        });
      }
    },
    [signUp],
  );

  const setPassword = useCallback(
    (password: string) => {
      const {
        name,
        email,
        ssn,
        cellphone,
        zipCode,
        street,
        number,
        complement,
        district,
        city,
        state,
        country,
      } = signUp;

      setSignUp({
        name,
        email,
        ssn,
        cellphone,
        zipCode,
        street,
        number,
        complement,
        district,
        city,
        state,
        country,
        password,
      });
    },
    [signUp],
  );

  const resetHook = useCallback(() => {
    setSignUp({} as SignUpProps);
  }, []);

  return (
    <SignUpContext.Provider
      value={{
        signUp,
        setFirstData,
        setAddress,
        setFinalData,
        setPassword,
        resetHook,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export function useSignUpContext(): SignUpContextData {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error(
      'useSignUpContext must be used within an AppointmentProvider',
    );
  }
  return context;
}
