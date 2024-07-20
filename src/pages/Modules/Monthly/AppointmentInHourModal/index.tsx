import React, { useState } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, differenceInMinutes, addHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {
  Container,
  Header,
  HeaderTitle,
  HeaderButton,
  Content,
  DescriptionText,
} from './styles';

interface PageProps {
  id: string;
  start_date: Date;
  closeModal: () => void;
}

const AppointmentInHourModal: React.FC<PageProps> = ({
  id,
  start_date,
  closeModal,
}) => {
  const [loading, setLoading] = useState(false);

  function formatDate(date: Date): string {
    const newDate = new Date(date);
    const dateToReturn = format(addHours(newDate.getTime(), 3), 'dd/MM/yyyy', {
      locale: ptBR,
    });
    return dateToReturn;
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>Atenção</HeaderTitle>
        <HeaderButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </HeaderButton>
      </Header>
      <Content>
        <DescriptionText>
          {`Existe uma reserva avulsa no dia ${formatDate(start_date)}`}
        </DescriptionText>
        <DescriptionText>
          Caso você compre este horário, você só poderá começar a usar a quadra
          depois deste dia.
        </DescriptionText>
        <DescriptionText>
          Mas não se preocupe! Não vamos te cobrar este horário por enquanto!
          Somente cobraremos quando você começar a jogar.
        </DescriptionText>
      </Content>
    </Container>
  );
};

export default AppointmentInHourModal;
