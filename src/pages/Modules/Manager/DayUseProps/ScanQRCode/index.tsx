import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import api from '../../../../../services/api';
import { useAuth } from '../../../../../hooks/auth';
import env from '../../../../../Config/Environment';
import { Container, Title, BackButton, BackButtonText } from './styles';

const ScanQRCode: React.FC = () => {
  const navigation = useNavigation();

  const { user } = useAuth();

  const scannerRef = useRef(null);

  const handleRemoveTicket = useCallback((key: string) => {
    api.put(`/dayUse/retrieveTicket?id_ticket=${key}`).then(response => {
      Alert.alert('', 'Ticket retirado com sucesso!');
    });
  }, []);

  const handleQRCodeScanned = useCallback(
    (key: string) => {
      api.get(`/dayUse/findTicket?id_ticket=${key}`).then(response => {
        if (response.data) {
          Alert.alert(
            'Ticket encontrado!',
            'Deseja dar baixa?',
            [
              {
                style: 'default',
                text: 'Não',
              },
              {
                style: 'default',
                text: 'Sim',
                onPress: () => handleRemoveTicket(key),
              },
            ],
            { cancelable: false },
          );
        } else {
          Alert.alert('Ops...', 'Não foi possível encontrar esse usuário');
        }
      });
    },
    [handleRemoveTicket],
  );

  return (
    <Container>
      <QRCodeScanner
        reactivate
        reactivateTimeout={5000}
        onRead={e => handleQRCodeScanned(e.data)}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={<Title>Aponte a camera para o QR Code</Title>}
        bottomContent={
          <BackButton onPress={() => navigation.goBack()}>
            <BackButtonText>Voltar</BackButtonText>
          </BackButton>
        }
      />
    </Container>
  );
};

export default ScanQRCode;
