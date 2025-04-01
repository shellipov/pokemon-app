import { Animated } from "react-native";

interface IFadeInFadeOutProps {
  items : Animated.Value[],
  duration?: number
}

interface IFadeInFadeOutArrayProps extends IFadeInFadeOutProps {
  isActive: boolean
}

export const fadeIn = (element:  Animated.Value, timeout=0) => {
  setTimeout(() => {
    Animated.timing(element, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, timeout);
};

export  const fadeOut = (element:  Animated.Value, duration = 1500) => {
  Animated.timing(element, {
    toValue: 0,
    duration: duration,
    useNativeDriver: true,
  }).start();
};

export  const fadeInArray = ({items , duration = 50}: IFadeInFadeOutProps) => {
  items.forEach((item, index) => {
    fadeIn(item, ((index + 1) * duration))
  })
};

export  const fadeOutArray = ({items , duration = 50}: IFadeInFadeOutProps) => {
  items.forEach((item, index) => {
    fadeOut(item, ((index + 1) * duration))
  })
};

export  const fadeInFadeOutUtil = ({items , duration, isActive }: IFadeInFadeOutArrayProps) => {
  if (isActive) {
    fadeInArray({items, duration})
  } else {
    fadeOutArray({items, duration})
  }
};
