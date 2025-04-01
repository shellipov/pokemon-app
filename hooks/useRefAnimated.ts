import {useRef} from "react";
import {Animated} from "react-native";

export function useRefAnimated() {
    return useRef(new Animated.Value(0)).current;
}
