import React, { createContext } from 'react';
import { InversifyConfig } from './inversify.config';

interface IInversifyProviderProps {
  children?: React.ReactNode;
}
export const InversifyContext = createContext({ InversifyConfig });

export const InversifyProvider: React.FC<IInversifyProviderProps> = (props: IInversifyProviderProps) => (
  <InversifyContext.Provider value={{ InversifyConfig }}>
    {props.children}
  </InversifyContext.Provider>
);


