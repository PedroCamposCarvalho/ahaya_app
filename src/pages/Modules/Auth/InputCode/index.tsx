import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialIcons';
import api from '@app/services/api';
import Toast from 'react-native-toast-message';
import {
  Container,
  SMSSentTitle,
  SMSSentText,
  ResendCode,
  BoxResendCode,
  BoxCode,
  Clear,
  LoadingContainer,
} from './styles';

const styles = StyleSheet.create({
  textBox: {
    textAlign: 'center',
    borderColor: '#999',
    fontSize: 45,
    borderWidth: 1,
    width: RFValue(45),
    height: RFValue(50),
    marginHorizontal: 6,
    paddingHorizontal: 9,
    borderRadius: 5,
    color: '#000',
  },
  textBoxes: {
    backfaceVisibility: 'visible',
    borderRadius: 5,
    borderWidth: 0,
    borderEndColor: '#ff999f',
    marginVertical: 25,
  },
});

interface RouteParams {
  email: string;
}

const InputCode: React.FC = () => {
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timeResend, setTimeResend] = useState(5);
  const [isClearInputs, setIsClearInputs] = useState(false);
  const [clearInputsVisible, setClearInputsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const { email } = route.params as RouteParams;

  const time = useCallback(() => {
    setTimeout(() => {
      setTimeResend(timeResend - 1);
    }, 1000);
  }, [timeResend]);

  useEffect(() => {
    if (timeResend > 0 && resendEnabled) {
      time();
    }
    if (timeResend === 0) {
      setTimeResend(5);
    }
  }, [time, timeResend, resendEnabled]);

  const resendSMS = useCallback(async () => {
    const secondsResend = 5000;
    time();
    setResendEnabled(true);
    setLoading(true);
    await api.post('/users/createPasswordCode', {
      email,
    });
    setTimeout(() => {
      setResendEnabled(false);
    }, secondsResend);
    setLoading(false);
    Toast.show({
      type: 'info',
      text2: 'Código reenviado!',
    });
  }, [time, email]);

  const clearInputs = useCallback((e: any) => {
    setIsClearInputs(true);
    Keyboard.dismiss();
  }, []);

  const submitCode = useCallback(
    dataCode => {
      setLoading(true);
      let code = '';
      dataCode.map(item => {
        code += item;
        return null;
      });
      api
        .get(`/users/validateLastCode?email=${email}&code=${code}`)
        .then(response => {
          if (String(response.data) === 'true') {
            navigation.navigate('ResetPassword', {
              email,
            });
          } else {
            WToast.show({
              data: 'Código invalido!',
              textColor: '#fff',
              backgroundColor: '#c53030',
              duration: WToast.duration.LONG,
              position: WToast.position.TOP,
            });
            clearInputs(true);
          }
          setLoading(false);
        });
    },
    [email, navigation, clearInputs],
  );
  const changeValue = useCallback(
    (combinedValueArray, currentValue, refForTheCurrentValue) => {
      const inputs = combinedValueArray.filter(
        (input: any) => input === null || input === '',
      );
      if (inputs.length === 0) {
        Keyboard.dismiss();
        submitCode(combinedValueArray);
      }
      setIsClearInputs(false);
    },
    [submitCode],
  );

  return (
    <Container onTouchStart={() => Keyboard.dismiss()}>
      <SMSSentTitle>Verifique seu e-mail!</SMSSentTitle>
      <SMSSentText>Enviamos um código para você</SMSSentText>

      <BoxCode
        noOfTextInput={5}
        textInputStyle={styles.textBox}
        onChangeValue={changeValue}
        parentViewStyle={styles.textBoxes}
        clearInput={isClearInputs}
      />
      {clearInputsVisible ? (
        <BoxResendCode onPress={() => clearInputs(true)}>
          <IconM name="clear" color="#999" />
          <Clear>Limpar</Clear>
        </BoxResendCode>
      ) : null}
      <BoxResendCode onPress={resendSMS} disabled={resendEnabled}>
        <Icon name="retweet" color={resendEnabled ? '#808080' : '#999'} />
        <ResendCode resendCode={resendEnabled}>
          Reenviar código {resendEnabled ? `em ${timeResend}` : ''}
        </ResendCode>
      </BoxResendCode>
      {loading && (
        <LoadingContainer>
          <ActivityIndicator color="#999" size="large" />
        </LoadingContainer>
      )}
    </Container>
  );
};

export default InputCode;
