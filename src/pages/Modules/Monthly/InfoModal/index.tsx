import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Header, HeaderTitle, HeaderButton } from './styles';

interface PageProps {
  closeModal: () => void;
}

const Rules: React.FC<PageProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Header>
        <HeaderTitle>Informações</HeaderTitle>
        <HeaderButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </HeaderButton>
      </Header>
    </Container>
  );
};

export default Rules;
