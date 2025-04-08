import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const DefaultButton = styled.TouchableOpacity`
  background-color: gray;
  width: 50%;
  padding-vertical: 30px;
  border-radius: 20px;
  shadow-color: rgba(61, 61, 61, 0.418);
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 5;
  border-color: black;
  border-width: 1px;
  shadow-offset: 2px 2px;
`;

export const SmallButton = styled.TouchableOpacity`
  background-color: rgb(24, 24, 24);
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 4px;
  margin-left: 12px;
  padding: 6px;
  width: 60px;
  padding-vertical: 30px;
  border-radius: 16px;
  shadow-color: gray;
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 5;
  border-color: black;
  border-width: 1px;
  shadow-offset: 1px 1px;
`;

export const GrayBackground = styled.View`
  background-color: gray;
  padding-horizontal: 50px;
  padding-vertical: 50px;
  border-radius: 20px;
  shadow-color: rgba(61, 61, 61, 0.418);
  shadow-offset: 2px 2px;
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 5;
  border-color: black;
  border-width: 1px;
  align-items: center;
`;

export const GameBackground = styled(Animated.View)`
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-radius: 20px;
  shadow-color: rgba(61, 61, 61, 0.418);
  shadow-offset: 2px 2px;
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 5;
  border-color: black;
  border-width: 1px;
`;

export const OrangeCard = styled.View`
  background-color: orange;
  padding-right: 15px;
  padding-left: 20px;
  padding-vertical: 6px;
  margin-horizontal: 20px;
  margin-top: 20px;
  border-radius: 16px;
  shadow-color: rgba(61, 61, 61, 0.418);
  shadow-offset: 1px 1px;
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 5;
  border-color: black;
  border-width: 1px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledImage = styled.Image`
  width: 100%;
  height: 150px;
  shadow-color: rgb(41, 41, 41);
  shadow-offset: 1px 1px;
  shadow-opacity: 1;
  shadow-radius: 1px;
  resize-mode: contain;
`;

// Modal components

export const CenteredBackView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  background-color: rgba(0, 0, 0, 0.747);
`;

export const ModaView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding-horizontal: 35px;
  padding-vertical: 100px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

export const CloseButton = styled.Pressable`
  background-color: gray;
  margin-top: 30px;
  width: 50%;
  padding-vertical: 15px;
  padding-horizontal: 30px;
  border-radius: 20px;
  shadow-color: rgba(61, 61, 61, 0.418);
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 5;
  border-color: black;
  border-width: 1px;
  shadow-offset: 2px 2px;
`;
