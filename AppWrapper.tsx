import React from 'react';
import App from './App';
import {CurrencyProvider} from './src/context/currencyContext';

const AppWraper = () => {
  return (
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  );
};

export default AppWraper;
