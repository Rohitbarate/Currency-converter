import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import axios from 'axios';
import {filterBaseCurrency} from '../utils';

// Define the shape of the context data
interface CurrencyContextProps {
  rates: {code: string; rate: number}[];
  loading: boolean;
  lastUpdateTD: string;
  error: Error | null;
  refreshRates: () => Promise<void>;
}

// Create the context with a default value
export const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined,
);

// Define the provider component
export const CurrencyProvider = ({children}) => {
  const [rates, setRates] = useState<{code: string; rate: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdateTD, setLastUpdateTD] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://v6.exchangerate-api.com/v6/7bdfcf698b20b9c13d0104c9/latest/INR',
      );
      const filteredRates = filterBaseCurrency(response.data);
      setRates(filteredRates);
      setLastUpdateTD(response.data.time_last_update_utc);
      setError(null);
    } catch (error) {
      console.log({error});
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return (
    <CurrencyContext.Provider
      value={{rates, loading, error, refreshRates: fetchRates, lastUpdateTD}}>
      {children}
    </CurrencyContext.Provider>
  );
};
