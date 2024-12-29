import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { format } from 'date-fns';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import api from '@app/services/api';

import {
  Container,
  Header,
  Title,
  CloseButton,
  Content,
  Description,
  ButtonsContainer,
  YesButton,
  YesButtonText,
  CancelButton,
  CancelButtonText,
} from './styles';

interface PageProps {
  id_monthly: string;
  hour: number;
  selectedDate: Date;
  closeModal: () => void;
}

const MonthlyMissedDayModal: React.FC<PageProps> = ({
  id_monthly,
  hour,
  selectedDate,
  closeModal,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    setLoading(true);

    const data = {
      id_monthly,
      date: new Date(selectedDate.setHours(hour)),
    };
    api.post('/missedDays/create', data).then(response => {
      setLoading(false);
      closeModal();
    });
  }, [id_monthly, selectedDate, hour, closeModal]);

  return (
    <Container>
      <Header>
        <Title>Cancelar horário mensal</Title>
        <CloseButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </CloseButton>
      </Header>
      <Content showsVerticalScrollIndicator={false}>
        <Description>
          {`Atenção!\n\nAo selecionar SIM, somente este dia (${format(
            selectedDate,
            'dd/MM/yyyy',
          )}) às ${String(hour).padStart(
            2,
            '0',
          )}:00 será disponibilizado para aluguel.\n\nDeseja continuar?`}
        </Description>
        <ButtonsContainer>
          <CancelButton onPress={() => closeModal()}>
            <CancelButtonText>Cancelar</CancelButtonText>
          </CancelButton>
          <YesButton onPress={() => handleSubmit()}>
            <YesButtonText>Sim</YesButtonText>
          </YesButton>
        </ButtonsContainer>
        {loading && <ActivityIndicator size="small" color="#000" />}
      </Content>
    </Container>
  );
};

export default MonthlyMissedDayModal;
