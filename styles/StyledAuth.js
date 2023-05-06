import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  flex-direction: ${(props) =>
    props.orientation === "portrait" ? "column" : "row"};
  width: 100%;
  height: 100%;
  /* justify-content: center;
  align-items: center; */
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #e97560;
`;

const SubTitle = styled.Text`
  color: #feaa25;
  font-size: 20px;
  font-weight: bold;
  opacity: 1;
  text-align: center;
`;

const StyledBtn = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  background-color: #e97560;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  opacity: 1;
`;
const ImageContainer = styled.Image`
  transform: scale(${(props) => props.scale});
`;

export { Container, Title, SubTitle, ImageContainer, StyledBtn };
