import { Animated } from "react-native";


export const fadeIn = (element, timeout=0) => {
  setTimeout(() => {
    Animated.timing(element, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, timeout);
};

export  const fadeOut = (element, duration = 1500) => {
  Animated.timing(element, {
    toValue: 0,
    duration: duration,
    useNativeDriver: true,
  }).start();
};
