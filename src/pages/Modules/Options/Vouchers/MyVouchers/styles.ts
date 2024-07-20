import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px 30px 40px;
  margin-top: 7%;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  width: 70%;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 70%;
`;

export const BackButton = styled.TouchableOpacity``;

export const TitleContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-family: 'Arial';
  font-size: 16px;
  color: #fff;
`;

export const Content = styled.View`
  margin-top: 20px;
`;
