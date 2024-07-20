import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { shade } from 'polished';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '@app/Config/Colors';
import api from '@app/services/api';
import { FlatList } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  BackButton,
  TitleView,
  HeaderTitle,
  LoadingContainer,
  UserContainer,
  UserName,
  UserPhoto,
  SearchInputContainer,
  SearchInput,
  RemoveSearchTextButton,
  UserVIPContainer,
  UserTotalContainer,
  UserTotalText,
} from './styles';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  ssn: string;
  cellphone: string;
  user_type: string;
  vip: boolean;
}

const AllUsers: React.FC = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    api
      .get(`/users/findAll?limit=${limit}&offset=${offset}&name=${searchName}`)
      .then(response => {
        setUsers(response.data.users);
        setTotal(response.data.count);
        setLoading(false);
      });
  }, [limit, offset, searchName]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FeatherIcon name="chevron-left" size={25} color={Colors.white} />
          </BackButton>
          <TitleView>
            <HeaderTitle>Usuários</HeaderTitle>
          </TitleView>
        </Header>
        <SearchInputContainer>
          <FeatherIcon name="search" color="#fff" size={20} />
          <SearchInput
            returnKeyType="done"
            placeholder="Pesquisar por nome"
            value={searchName}
            onChangeText={text => setSearchName(text)}
            placeholderTextColor={shade(0.1, '#fff')}
          />
          <RemoveSearchTextButton onPress={() => setSearchName('')}>
            <FeatherIcon name="x-circle" color="#fff" size={20} />
          </RemoveSearchTextButton>
        </SearchInputContainer>

        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color={Colors.white} size="large" />
          </LoadingContainer>
        ) : (
          <>
            <UserTotalContainer>
              <UserTotalText>{`Total: ${total}`}</UserTotalText>
            </UserTotalContainer>
            <FlatList
              data={users}
              keyExtractor={user => user.id}
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                setLimit(limit + 10);
              }}
              style={{
                paddingTop: RFValue(24),
                paddingRight: RFValue(20),
                paddingLeft: RFValue(20),
              }}
              renderItem={({ item: user }) => (
                <UserContainer
                  onPress={() =>
                    navigation.navigate('UserDetail', { id: user.id })
                  }
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <UserPhoto
                      source={{
                        uri: `https://app-arenaibirapuera.s3.amazonaws.com/${
                          user.avatar || 'avatar.jpg'
                        }`,
                      }}
                    />
                    <UserName numberOfLines={1}>{user.name}</UserName>
                    <UserVIPContainer>
                      {user.vip ? (
                        <FeatherIcon
                          style={{ marginLeft: '20%' }}
                          name="star"
                          size={20}
                          color="yellow"
                        />
                      ) : (
                        <></>
                      )}
                    </UserVIPContainer>
                  </View>
                  <FeatherIcon name="chevron-right" color="#fff" size={20} />
                </UserContainer>
              )}
            />
          </>
        )}
      </Container>
    </LinearGradient>
  );
};
export default AllUsers;
