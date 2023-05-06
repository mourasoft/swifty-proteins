import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  flex-direction: ${(props) =>
    props.orientation === "portrait" ? "column" : "row"};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

const SubTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  opacity: 0.5;
`;

const ImageContainer = styled.Image`
  transform: scale(${(props) => props.scale});
  /* border: 1px solid black; */
`;

const customView = styled.View`
 flex: 1,
          justify-content: center,
            align-items: center,
`;

export { Container, Title, SubTitle, ImageContainer };
