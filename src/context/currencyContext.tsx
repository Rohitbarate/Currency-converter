// src/context/CurrencyContext.tsx
import React, {createContext, useState, useEffect, ReactNode} from 'react';
import axios from 'axios';

interface CurrencyContextProps {
  rates: {[key: string]: number};
  loading: boolean;
  error: Error | null;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined,
);

const CurrencyProvider = ({children}: {children: ReactNode}) => {
  const [rates, setRates] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   axios
  //     .get('https://api.exchangerate-api.com/v4/latest/INR')
  //     .then(response => {
  //       setRates(response?.conversion_rates);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <CurrencyContext.Provider value={{rates, loading, error}}>
      {children}
    </CurrencyContext.Provider>
  );
};

export {CurrencyProvider, CurrencyContext};
