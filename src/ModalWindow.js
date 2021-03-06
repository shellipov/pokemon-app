import React from "react";
import { Modal, Alert } from "react-native";
import {
  BlackText,
  WhiteText,
  CenteredBackView,
  ModaView,
  CloseButton,
} from "../src/StyledComponents";

const ModalWindow = ({
  modalVisible,
  setModalVisible,
  score,
  counter,
  navigation,
  playClick,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <CenteredBackView>
        <ModaView>
          <BlackText style={{ fontSize: 25 }}>Game Over</BlackText>
          <BlackText style={{ fontSize: 13, marginTop: 30 }}>
            {counter === 0 ? "time is up" : "no more lifes"}
          </BlackText>
          <BlackText style={{ fontSize: 13, marginTop: 9 }}>
            You score: {score}
          </BlackText>
          <CloseButton
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate("MainPage");
              playClick();
            }}
          >
            <WhiteText>Close</WhiteText>
          </CloseButton>
        </ModaView>
      </CenteredBackView>
    </Modal>
  );
};

export default ModalWindow;
