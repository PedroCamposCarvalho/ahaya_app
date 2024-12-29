import React, { useCallback, useEffect, useState, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  Dimensions,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/api';
import {
  Container,
  Content,
  TitleView,
  TitleText,
  DescriptionContent,
  DescriptionText,
  GoToStoreButton,
  GoToStoreText,
  LoadingContainer,
} from './styles';

const UpdateApp: React.FC = () => {
  const imageHeight = Dimensions.get('window').height * 0.3;
  const imageWidth = Dimensions.get('window').width;

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/profile/storeUrl?platform=${Platform.OS}`).then(response => {
      setUrl(response.data.url);
      setLoading(false);
    });
  }, []);

  const handleOpenStore = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  return (
    <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1 }}>
      <Container>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <>
            <Content>
              <Image
                source={{
                  uri: 'https://app-ahaya.s3.amazonaws.com/ahaya_logo.png',
                }}
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  resizeMode: 'contain',
                  marginTop: '10%',
                }}
              />
              <TitleView>
                <TitleText>Nova versão disponível</TitleText>
              </TitleView>
              <DescriptionContent>
                <DescriptionText>
                  Uma atualização com melhorias e novas funcionalidades está
                  dispovível na loja
                </DescriptionText>
                <DescriptionText>
                  Atualize para continuar usando o app!
                </DescriptionText>
              </DescriptionContent>
            </Content>
            <GoToStoreButton onPress={() => handleOpenStore()}>
              <GoToStoreText>Ir para a loja</GoToStoreText>
            </GoToStoreButton>
          </>
        )}
      </Container>
    </LinearGradient>
  );
};

export default UpdateApp;
