import React from "react";
import { mainStyles } from "../styles/styles";
import { Modal, Alert, StyleSheet, Pressable, View, Text } from "react-native";

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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[mainStyles.comix, { fontSize: 25 }]}>Game Over</Text>
          <Text style={[mainStyles.comix, { fontSize: 13, marginTop: 30 }]}>
            {counter === 0 ? "time is up" : "no more lifes"}
          </Text>
          <Text style={[mainStyles.comix, { fontSize: 13, marginTop: 9 }]}>
            You score: {score}
          </Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate("MainPage");
              playClick();
            }}
          >
            <Text style={mainStyles.comixWhite}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWindow;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0, 0, 0, 0.747)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "gray",
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: "gray",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    borderColor: "black",
    borderWidth: 1,
  },
});
