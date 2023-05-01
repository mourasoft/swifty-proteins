import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';


const CustomModal= ({ visible, name, color , onClose}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalView, { backgroundColor: 'white' }]}>
          <Text>{name}</Text>
          {/* modal content goes here */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default CustomModal;