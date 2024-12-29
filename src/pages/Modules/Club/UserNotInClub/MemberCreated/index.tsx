/* eslint-disable global-require */
/* eslint-disable react/no-unescaped-entities */
import React, { useCallback } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../../../hooks/auth';
import api from '../../../../../services/api';
import {
  Container,
  DescriptionView,
  DescriptionText,
  GoBackButton,
  GoBackButtonText,
  Content,
} from './styles';

const MemberCreated: React.FC = () => {
  const { reset } = useNavigation();
  const navigation = useNavigation();
  const { user, updateUser } = useAuth();

  const handleGoBack = useCallback(async () => {
    api.put(`users/changeVIPStatus?id_user=${user.id}`).then(async response => {
      let newUser = user;
      newUser.vip = true;
      await updateUser(newUser);

      reset({
        routes: [{ name: 'Club' }],
        index: 0,
      });
    });
  }, [reset, user, updateUser]);

  return (
    <Container>
      <Content>
        <DescriptionView>
          <DescriptionText>Obrigado!</DescriptionText>
          <DescriptionText>
            Clique em OK para obter sua carteirinha
          </DescriptionText>
          <DescriptionText>Até logo!</DescriptionText>
        </DescriptionView>
        <GoBackButton onPress={() => handleGoBack()}>
          <GoBackButtonText>OK</GoBackButtonText>
        </GoBackButton>
      </Content>
    </Container>
  );
};

export default MemberCreated;
