// @ts-ignore
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList, Routes} from '@/src/AppPouter.types';

export function useNavigationHook () {
  return useNavigation<StackNavigationProp<RootStackParamList, Routes>>();
}
