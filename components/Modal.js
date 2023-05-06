import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import styled from "styled-components";

const ModalContent = ({ title, name }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', fontSize: 20 }}>
      <Text style={{ color: '#e97560', fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ marginLeft: 5 }}>{name}</Text>
    </View>
  )
}

const CustomModal = ({ data, visible, setVisible }) => {
  console.log(data);
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
          <ModalContent title={`Discovered By: `} name={data?.discoverdBy} />
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

// import React from "react";
// import { Modal, View, Text, StyleSheet } from "react-native";
// import styled from "styled-components";


// const ModalContent = ({ title, name }) => {
//   return <View style={{ display: 'flex', flexDirection: 'row', fontSize: 20 }}>
//     <Text style={{ color: '#e97560' }}> {title}</Text>
//     <Text>{name}</Text>
//   </View>
// }

// const CustomModal = ({ data, visible, setVisible }) => {
//   console.log(data);
//   return (
//     <Modal transparent visible={visible} animationType="slide">
//       <View style={styles.modalContainer}>
//         <View style={[styles.modalView, { backgroundColor: "white" }]}>
//           <BottonStyle title="X" onPress={() => setVisible(false)}>
//             <Text>X</Text>
//           </BottonStyle>
//           <ModalContent title={`Name: `} name={data?.name} />
//           <ModalContent title={`element: `} name={data?.element} />
//           <ModalContent title={`Phase: `} name={data?.phase} />
//           <ModalContent title={`Discoverd By: `} name={data?.discoverdBy} />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const BottonStyle = styled.TouchableOpacity`
//   width: 40px;
//   height: 40px;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   margin-right: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   /* background: #E97560; */
//   border-radius: 12px;
//   align-self: flex-end;
//   /* color: #FFFF; */
// `;

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalView: {
//     width: 250,
//     height: 200,
//     // justifyContent: 'center',
//     // alignItems: "center",
//     paddingLeft: 20,
//     borderRadius: 10,
//   },
// });

// export default CustomModal;
