import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) =>
    props.isBlacktheme ? "rgb(24, 24, 24)" : "white"};
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const Button = styled.TouchableOpacity`
  background-color: gray;
  width: 50%;
  padding-vertical: 30px;
  border-radius: 20px;
  shadow-color: rgba(61, 61, 61, 0.418);
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 1;
  border-color: black;
  border-width: 1px;
  shadow-offset: 2px 2px;
`;

export const LittleButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.isBlacktheme ? "rgb(24, 24, 24)" : "white"};
  ${(props) => props.active && "background-color: gray"};
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
  elevation: 1;
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
  elevation: 1;
  border-color: black;
  border-width: 1px;
  align-items: center;
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
  elevation: 1;
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

//Fonts

export const OrangText = styled.Text`
  font-family: "comix";
  font-size: 15px;
  color: orange;
  text-shadow-color: ${(props) => (props.isBlacktheme ? "white" : "rgba(0, 0, 0, 0.75)")};
  text-shadow-offset: -1px 1px;
  text-shadow-radius: 1px;
  padding: 5px;
  text-align: center;
`;

export const WhiteText = styled.Text`
  font-family: "comix";
  font-size: 10px;
  color: ${(props) => (props.isBlacktheme ? "black" : "white")};
  text-shadow-color: ${(props) => (props.isBlacktheme ? "white" : "rgba(0, 0, 0, 0.75)")};
  text-shadow-offset: -1px 1px;
  text-shadow-radius: 1px;
  text-align: center;
`;

export const BlackText = styled.Text`
  font-family: "comix";
  font-size: 10px;
  color: black;
  text-align: center;
`;
