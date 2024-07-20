import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import api from '../../../../../services/api';
import {
  Container,
  Header,
  Title,
  CloseButton,
  LoadingContainer,
  Content,
  NoUsersFoundText,
  TableTitleContainer,
  UserTitle,
  MaterialsTitle,
  TicketsTitle,
  UsersList,
  UserContainer,
  UserName,
  MaterialsAmount,
  TicketsAmount,
} from './styles';

export interface UserProps {
  id: string;
  name: string;
  paid_price: number;
  material_amount: number;
  tickets: number;
}
interface PageProps {
  id_dayuse: string;
  price: number;
  closeModal: () => void;
}

const DayUseUsersModal: React.FC<PageProps> = ({ id_dayuse, closeModal }) => {
  const [loading, setLoading] = useState(true);
  const [dayUseUsers, setDayUseUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    api.get(`dayUse/findUsersByList?id_dayuse=${id_dayuse}`).then(response => {
      setDayUseUsers(response.data);

      setLoading(false);
    });
  }, [id_dayuse]);
  return (
    <Container>
      <Header>
        <Title>Usuários</Title>
        <CloseButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </CloseButton>
      </Header>
      <Content>
        {loading ? (
          <ActivityIndicator color="#006edb" size="small" />
        ) : (
          <>
            {dayUseUsers.length === 0 ? (
              <NoUsersFoundText>Nenhum cliente ainda</NoUsersFoundText>
            ) : (
              <>
                <TableTitleContainer>
                  <UserTitle>Cliente</UserTitle>
                  <MaterialsTitle>Rqts.</MaterialsTitle>
                  <TicketsTitle>Tickets</TicketsTitle>
                </TableTitleContainer>
                <UsersList
                  data={dayUseUsers}
                  keyExtractor={item => item.name}
                  renderItem={({ item: user }) => (
                    <UserContainer>
                      <UserName>{user.name}</UserName>
                      <MaterialsAmount>{user.material_amount}</MaterialsAmount>
                      <TicketsAmount>{user.tickets}</TicketsAmount>
                    </UserContainer>
                  )}
                />
              </>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default DayUseUsersModal;
