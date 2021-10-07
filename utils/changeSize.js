import { Animated } from "react-native";


export function sizeUpAnimation (value){
  Animated.timing(value, {
    toValue: 1.4,
    duration: 7000,
    useNativeDriver: true,
  }).start()
}

export function sizeDownAnimation (value){
  Animated.timing(value, {
    toValue: 1,
    duration: 1,
    useNativeDriver: true,
  }).start()
}
