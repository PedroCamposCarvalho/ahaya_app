/* eslint-disable no-plusplus */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '@app/hooks/auth';
import { useAppointmentContext } from '@app/hooks/appointment';
import { useSportContext } from '@app/hooks/sports';
import api from '@app/services/api';
import { FlatList } from 'react-native-gesture-handler';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  UserProfilePicture,
  PageDescription,
  SportContainer,
  SportDescription,
  SportImage,
  LoadingContainer,
  PoweredByImage,
  ProfileButton,
  SportsContainer,
} from './styles';

export interface Sports {
  id: string;
  name: string;
  photo: string;
}

const SelectSport: React.FC = () => {
  const { user, signOut } = useAuth();
  const [error, setError] = useState(false);
  const { setSportData } = useAppointmentContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { sports, sportsLoading } = useSportContext();

  const handleContinue = useCallback(
    (id_sport: string, sport_name: string) => {
      setSportData(id_sport, sport_name);
      navigation.navigate('SelectDayHour', {
        id_sport,
      });
    },
    [setSportData, navigation],
  );

  return (
    <LinearGradient
      colors={['#006edb', '#273a9a']}
      style={{ flex: 1 }}
      testID="SelectSport"
    >
      <Container>
        <Header>
          <HeaderTitle>
            Bem vindo, {'\n'}
            <UserName>{user.name}</UserName>
          </HeaderTitle>
          <ProfileButton onPress={() => navigation.navigate('Profile')}>
            <UserProfilePicture
              source={{
                uri: user.avatar_url
                  ? user.avatar_url
                  : 'https://app-arenaibirapuera.s3.amazonaws.com/avatar.jpg',
              }}
            />
          </ProfileButton>
        </Header>
        <PageDescription>O que você quer jogar?</PageDescription>
        {sportsLoading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <SportsContainer>
            <FlatList
              data={sports}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              renderItem={({ item: sport }) => (
                <SportContainer
                  onPress={() => {
                    handleContinue(sport.id, sport.name);
                  }}
                  activeOpacity={1}
                >
                  <SportImage
                    source={{
                      uri: sport.photo,
                    }}
                  />
                  <SportDescription>{sport.name}</SportDescription>
                </SportContainer>
              )}
            />
          </SportsContainer>
        )}
        <PoweredByImage
          source={{
            uri: 'https://app-beachsports.s3.amazonaws.com/PoweredByPluma.png',
          }}
          style={{ resizeMode: 'contain' }}
        />
      </Container>
    </LinearGradient>
  );
};
export default SelectSport;
