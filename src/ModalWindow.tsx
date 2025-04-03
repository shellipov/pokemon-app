import React from 'react';
import {Alert, Modal} from 'react-native';
import {BlackText, CenteredBackView, CloseButton, ModaView, WhiteText,} from '@/src/StyledComponents';
import {Routes} from '@/src/AppRouter';
import {useNavigationHook} from '@/hooks/useNavigation';

const ModalWindow = ({
  modalVisible,
  setModalVisible,
  score,
  counter,
}) => {
  const navigation = useNavigationHook();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <CenteredBackView>
        <ModaView>
          <BlackText style={{ fontSize: 25 }}>Game Over</BlackText>
          <BlackText style={{ fontSize: 13, marginTop: 30 }}>
            {counter === 0 ? 'time is up' : 'no more lifes'}
          </BlackText>
          <BlackText style={{ fontSize: 13, marginTop: 9 }}>
            {`You score: ${score}`}
          </BlackText>
          <CloseButton
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.popToTop();
              navigation.navigate(Routes.MainPage);
            }}
          >
            <WhiteText>
              {'Close'}
            </WhiteText>
          </CloseButton>
        </ModaView>
      </CenteredBackView>
    </Modal>
  );
};

export default ModalWindow;
