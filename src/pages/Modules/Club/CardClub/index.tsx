import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { format, differenceInMinutes, addHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { RFValue } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import RulesModal from './RulesModal';
import {
  Container,
  Content,
  CardView,
  CardHeader,
  CardProfileImage,
  CardTitle,
  CardHakaLogo,
  CardNameContainer,
  CardNameTitle,
  CardName,
  CardExpiresIn,
  LoadingContainer,
  RulesButton,
  RulesText,
  RenewPlanButton,
  RenewPlanButtonText,
} from './styles';

interface MemberProps {
  id: string;
  months: number;
  expires_in: Date;
}

const CardClub: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [expired, setExpired] = useState(false);
  const [member, setMember] = useState<MemberProps>({} as MemberProps);

  useEffect(() => {
    api.get(`/club/findUserById?id_user=${user.id}`).then(response => {
      setMember(response.data);
      if (new Date().getTime() > new Date(response.data.expires_in).getTime()) {
        setExpired(true);
      }
      setLoading(false);
    });
  }, []);

  function formatDate(date: Date): string {
    const newDate = new Date(date);
    const dateToReturn = format(newDate.getTime(), 'dd/MM/yyyy', {
      locale: ptBR,
    });
    return dateToReturn;
  }

  function getBackgroundColor(months: number, expires_in: Date): string {
    if (new Date().getTime() > new Date(expires_in).getTime()) {
      return 'red';
    }
    if (months > 1) {
      return '#e00265';
    }
    return '#f1d72a';
  }

  return (
    <Container>
      <Content>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <>
            <CardView
              background={getBackgroundColor(member.months, member.expires_in)}
            >
              <CardHeader>
                <CardProfileImage
                  source={{
                    uri: user.avatar_url
                      ? user.avatar_url
                      : 'https://app-arenaibirapuera.s3.amazonaws.com/avatar.jpg',
                  }}
                  style={{ resizeMode: 'contain' }}
                />
                <CardTitle>Clubinho HAKA</CardTitle>
                <CardHakaLogo
                  source={{
                    uri: 'https://app-haka.s3.amazonaws.com/appstore.png',
                  }}
                  style={{ resizeMode: 'contain' }}
                />
              </CardHeader>
              <CardNameContainer>
                <CardNameTitle>Nome: </CardNameTitle>
                <CardName>{user.name}</CardName>
              </CardNameContainer>
              <CardNameContainer>
                <CardNameTitle>Expira em: </CardNameTitle>
                <CardName>{formatDate(member.expires_in)}</CardName>
              </CardNameContainer>
              <RulesButton onPress={() => setModalOpen(true)}>
                <FeatherIcon name="book" size={RFValue(20)} color="#fff" />
                <RulesText>Regras</RulesText>
              </RulesButton>
            </CardView>
            {expired ? (
              <RenewPlanButton onPress={() => navigation.navigate('Rules')}>
                <RenewPlanButtonText>Renovar plano</RenewPlanButtonText>
              </RenewPlanButton>
            ) : (
              <></>
            )}
          </>
        )}
      </Content>
      <Modal isVisible={modalOpen}>
        <RulesModal closeModal={() => setModalOpen(false)} />
      </Modal>
    </Container>
  );
};

export default CardClub;
