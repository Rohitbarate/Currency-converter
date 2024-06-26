// utils.ts

interface ConversionRate {
  code: string;
  rate: number;
}

export const filterBaseCurrency = (data: any): ConversionRate[] => {
  const {base_code, conversion_rates} = data;
  return Object.keys(conversion_rates)
    .filter(key => key !== base_code)
    .map(key => ({
      code: key,
      rate: conversion_rates[key],
    }));
};
