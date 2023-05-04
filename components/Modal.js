import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import styled from "styled-components";

const CustomModal = ({ data, visible, setVisible }) => {
  console.log(data);
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalView, { backgroundColor: "white" }]}>
          <BottonStyle title="X" onPress={() => setVisible(false)}>
            <Text>X</Text>
          </BottonStyle>
          <Text>{`Name: ${data?.name}`}</Text>
          <Text>{`element: ${data?.element}`}</Text>
          <Text>{`Phase: ${data?.phase}`}</Text>
          <Text>{`Discoverd By: ${data?.discoverdBy}`}</Text>
          {/* <Text>{name}</Text> */}
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
  /* background: #E97560; */
  border-radius: 12px;
  align-self: flex-end;
  /* color: #FFFF; */
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
    // justifyContent: 'center',
    alignItems: "center",
    borderRadius: 10,
  },
});

export default CustomModal;
