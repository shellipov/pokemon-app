import { useRef } from 'react';
import { Animated } from 'react-native';

export function useRefAnimated (value?: number) {
  const startValue = !!value ? value : 0;

  return useRef(new Animated.Value(startValue)).current;
}
