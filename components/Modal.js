import React from "react";
import { Modal, View, Text, StyleSheet,TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Linking } from 'react-native';


const navigateToLink = (url) => {
  Linking.openURL(url).catch((err) => console.error('Error navigating to link:', err));
};
const ModalContent = ({ title, name }) => {
  const words = name.split(" ");
  const newSentence = words.join("_");
  return (
    <View style={{ display: 'flex', flexDirection: 'row', fontSize: 20 }}>
      <Text style={{ color: '#e97560', fontWeight: 'bold' }}>{title}</Text>
      {
        title === 'Discovered By: ' ?
          <TouchableOpacity
            title={name}
            onPress={() => {
              console.log('hahahahahah');
              navigateToLink(`https://fr.wikipedia.org/wiki/${newSentence}`);
            }} >
              <Text>{name}</Text>
            </TouchableOpacity> :
          <Text style={{ marginLeft: 5 }}>{name}</Text>
      }
    </View>
  )
}

const CustomModal = ({ data, visible, setVisible }) => {

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalView, { backgroundColor: "white" }]}>
          <BottonStyle title="X" onPress={() => setVisible(false)}>
            <Text style={{ color: '#ffff', fontWeight: 'bold', fontSize: 20 }}>X</Text>
          </BottonStyle>
          <ModalContent title={`Name: `} name={data?.name} />
          <ModalContent title={`Element: `} name={data?.element} />
          <ModalContent title={`Phase: `} name={data?.phase} />
          <TouchableOpacity onPress={() => {
            console.log('hahahahahah');
            // navigateToLink(`https://fr.wikipedia.org/wiki/${newSentence}`);
          }}>
            <ModalContent title={`Discovered By: `} name={data?.discoverdBy} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const BottonStyle = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  align-self: flex-end;
  background-color: #e97560;
`;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 250,
    height: 200,
    paddingLeft: 20,
    borderRadius: 10,
  },
});

export default CustomModal;
