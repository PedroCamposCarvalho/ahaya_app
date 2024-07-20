import React, { useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Header,
  Title,
  CloseButton,
  Content,
  OptionButton,
  FakeButtonOption,
  OptionText,
  FinishButton,
  FinishButtonText,
} from './styles';

interface PageProps {
  closeModal: () => void;
  handleNavigation: (item: string) => void;
}

const SelectPaymentTypeModal: React.FC<PageProps> = ({
  closeModal,
  handleNavigation,
}) => {
  const [selectedItem, setSelectedItem] = useState('');
  return (
    <Container>
      <Header>
        <Title>Pagar com</Title>
        <CloseButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </CloseButton>
      </Header>
      <Content>
        <OptionButton onPress={() => setSelectedItem('PIX')}>
          <FakeButtonOption selected={selectedItem === 'PIX'} />
          <OptionText>PIX</OptionText>
        </OptionButton>
        <OptionButton onPress={() => setSelectedItem('Crédito')}>
          <FakeButtonOption selected={selectedItem === 'Crédito'} />
          <OptionText>Cartão de crédito</OptionText>
        </OptionButton>
      </Content>
      <FinishButton
        disabled={selectedItem === ''}
        onPress={() => handleNavigation(selectedItem)}
      >
        <FinishButtonText>Continuar</FinishButtonText>
      </FinishButton>
    </Container>
  );
};

export default SelectPaymentTypeModal;
