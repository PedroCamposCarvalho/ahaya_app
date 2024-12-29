import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../../../services/api';

import {
  Container,
  Header,
  BackButton,
  TitleView,
  Title,
  Content,
  TitleInputView,
  MessageInputView,
  Input,
  SendButton,
  SendButtonText,
} from './styles';

const Notifications: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const sendMessage = useCallback(() => {
    setLoading(true);
    api
      .put('/profile/notification', {
        title,
        message,
      })
      .then(response => {
        setTitle('');
        setMessage('');
        setLoading(false);
      });
  }, [title, message]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <TitleView>
            <Title>Notificações</Title>
          </TitleView>
        </Header>
        <Content>
          <TitleInputView>
            <Input
              value={title}
              onChangeText={text => setTitle(text)}
              placeholder="Título"
              returnKeyType="done"
              placeholderTextColor="rgba(255,255,255,0.5)"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </TitleInputView>
          <MessageInputView>
            <Input
              multiline
              value={message}
              onChangeText={text => setMessage(text)}
              placeholder="Mensagem"
              returnKeyType="done"
              placeholderTextColor="rgba(255,255,255,0.5)"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </MessageInputView>
        </Content>
        <SendButton
          enabled={title !== '' && message !== ''}
          disabled={title === '' && message === ''}
          onPress={() => sendMessage()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <SendButtonText enabled={title !== '' && message !== ''}>
              Enviar
            </SendButtonText>
          )}
        </SendButton>
      </Container>
    </LinearGradient>
  );
};

export default Notifications;
