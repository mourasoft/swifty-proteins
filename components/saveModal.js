import React, { useEffect } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import LottieView from "lottie-react-native";
import saved from "../animation/saved.json"
const SaveModal = ({ visible, setVisible }) => {
    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={[styles.modalView, { backgroundColor: "white", alignContent: 'center' }]}>
                    <BottonStyle title="X" onPress={() => setVisible(false)}>
                        <Text style={{ color: '#ffff', fontWeight: 'bold', fontSize: 20 }}>X</Text>
                    </BottonStyle>
                    <View style={{ display: 'flex', fontSize: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView
                            autoPlay
                            loop={false}
                            style={{
                                width: 100,
                                height: 100,
                                maxWidth: 380,
                            }}
                            source={saved}
                        />
                    </View>
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
        alignContent: "center",
    },
});

export default SaveModal;
