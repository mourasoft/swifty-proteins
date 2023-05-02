import styled from "styled-components";

const Ligand = styled.Text`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 3px;
  color: #fff;
`;

const ItemView = styled.TouchableOpacity`
  background-color: #e97560;
  padding-inline: 20px;
  border-radius: 4px;
  padding: 5px 20px;
  margin: 4px;
`;

const StyledInput = styled.TextInput`
  /* flex: 1; */
  border: 1px solid red;
  border-radius: 10px;
  padding: 0 10px;
  width: 96%;
  min-height: 40px;
`;

export { Ligand, ItemView, StyledInput };
