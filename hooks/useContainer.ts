import { useContext } from 'react';
import { InversifyContext } from '@/boot/IoC/provider';

export function useContainer () {
  const { InversifyConfig } = useContext(InversifyContext);

  return InversifyConfig;
}
