import React from 'react';
import {Alert, Modal} from 'react-native';
import {CenteredBackView, ModaView,} from '@/src/StyledComponents';
import {useNavigationHook} from '@/hooks/useNavigation';
import {TextUI} from '@/components/ui/TextUI';
import {ButtonUI} from '@/components/ui/ButtonUI/ButtonUI.component';

export interface IModalWindowProps {
    modalVisible: boolean,
    setModalVisible: (visible: boolean)=> void,
    score: number,
    counter: number
}

export const ModalWindow = (Props : IModalWindowProps) => {
  const navigation = useNavigationHook();
  const {modalVisible, setModalVisible, score, counter} = Props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <CenteredBackView>
        <ModaView>
          <TextUI type={'black'} text={'Game Over'} style={{ fontSize: 25 }}/>
          <TextUI type={'black'} text={counter === 0 ? 'time is up' : 'no more lives'} style={{ fontSize: 13, marginTop: 30 }}/>
          <TextUI type={'black'} text={`You score: ${score}`} style={{ fontSize: 13, marginTop: 9 }} />
          <ButtonUI type={'close'}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.popToTop();
              navigation.navigate('MainPage');}}>
            <TextUI type={'white'} text={'Close'} />
          </ButtonUI>
        </ModaView>
      </CenteredBackView>
    </Modal>
  );
};
