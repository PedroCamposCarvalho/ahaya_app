import React, { useCallback, useState, useRef, useMemo } from 'react';
import {
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import ModalDropdown from 'react-native-modal-dropdown';
import * as Yup from 'yup';
import Modal from 'react-native-modal';
import Input from '@app/components/Input';
import Button from '@app/components/AuthButton';
import MaskedInput from '@app/components/MaskedInput';
import { validateSSN } from '@app/utils/validations';
import getValidationErrors from '@app/utils/getValidationErrors';
import GetGendersList from '@app/utils/genderList';
import api from '@app/services/api';
import { useAuth } from '@app/hooks/auth';
import FormatBirthDate from '@app/utils/SignUp/FormatBirthDate';
import { findBySsn, findByEmail } from '@app/utils/SignUp/validations';
import logo_blue from '@app/assets/logo_blue.png';
import Colors from '@app/Config/Colors';
import TermsModal from './TermsModal';
import PolicyPrivacyModal from './PolicyPrivacyModal';
import {
  Container,
  Header,
  BackButton,
  RaquetImage,
  Content,
  CreateAccountLabel,
  StateCityContainer,
  StateView,
  TermsPrivacyContainer,
  ReadTermsText,
  TermsButton,
  TermsButtonText,
  StateContainer,
  CityContainer,
  ZipCodeContainer,
  SeachZipCodeButton,
  ZipCodeView,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  ssn: string;
  cellphone: string;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  city: string;
  uf: string;
  district: string;
  password: string;
  passwordConfirm: string;
  birthDate: string;
}

const ProfileSignUp: React.FC = () => {
  const [termsModal, setTermsModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);

  const navigation = useNavigation();
  const [loadingCities, setLoadingCitites] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const emailRef = useRef<TextInput>(null);
  const ssnRef = useRef<TextInput>(null);
  const cellphoneRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const numberRef = useRef<TextInput>(null);
  const complementRef = useRef<TextInput>(null);
  const districtRef = useRef<TextInput>(null);
  const ufRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const birthDateRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [readTerms, setReadTerms] = useState(false);

  const [gender, setGender] = useState('');
  const [zipCodeLoading, setZipCodeLoading] = useState(false);

  const { signIn } = useAuth();
  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string().required().email(),
          ssn: Yup.string().required().length(14),
          cellphone: Yup.string().required().length(14),
          zipCode: Yup.string().required(),
          address: Yup.string().required(),
          number: Yup.string().required(),
          uf: Yup.string().required(),
          city: Yup.string().required(),
          complement: Yup.string().required(),
          district: Yup.string().required(),
          birthDate: Yup.string().required().length(10),
          password: Yup.string().required(),
          passwordConfirm: Yup.string()
            .required()
            .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        if (gender === '') {
          Toast.show({
            type: 'error',
            text2: 'Preencha todos os campos para continuar',
          });
          throw Error();
        }
        if (!readTerms) {
          Toast.show({
            type: 'error',
            text2:
              'Você deve concordar com os TERMOS DE USO e a POLÍTICA DE PRIVACIDADE!',
          });
          throw Error();
        }

        if (validateSSN(data.ssn)) {
          const existingSsn = await findBySsn(data.ssn);
          if (existingSsn === undefined) {
            Toast.show({
              type: 'error',
              text2: 'Ocorreu um erro. Entre em contato com o administrador.',
            });
            setLoading(false);
          } else if (existingSsn) {
            Toast.show({
              type: 'error',
              text2: 'Este CPF já está cadastrado',
            });
            ssnRef.current?.focus();
            setLoading(false);
          } else {
            const existingEmail = await findByEmail(data.email);
            if (existingEmail === undefined) {
              Toast.show({
                type: 'error',
                text2: 'Ocorreu um erro. Entre em contato com o administrador.',
              });
              setLoading(false);
            } else if (existingEmail) {
              Toast.show({
                type: 'error',
                text2: 'Este e-mail já está cadastrado',
              });
              emailRef.current?.focus();
              setLoading(false);
            } else {
              // setFirstData(data);
              const userData = {
                name: data.name,
                email: data.email,
                ssn: data.ssn,
                password: data.password,
                id_place: 'f13f0061-01f0-476f-9d6c-fe4a1a1f64ca',
                user_type: 'b2e4c13c-05b1-4c94-a8a1-92aedcb8e5b9',
                is_monthly: false,
                cellphone: data.cellphone,
                zipCode: data.zipCode,
                street: data.address,
                number: data.number,
                complement: data.complement,
                district: data.district,
                city: data.city,
                state: data.uf,
                gender,
                birth_date: FormatBirthDate(data.birthDate),
                notification_id: '',
              };

              api
                .post('/users', userData)
                .then(async response => {
                  await signIn({ email: data.email, password: data.password });
                })
                .catch(() => {
                  setLoading(false);
                });
            }
          }
        } else {
          Toast.show({
            type: 'error',
            text2: 'CPF inválido',
          });
          setLoading(false);
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          if (error.message === 'As senhas não coincidem') {
            Toast.show({
              type: 'error',
              text2: 'As senhas não coincidem',
            });
          } else {
            Toast.show({
              type: 'error',
              text2: 'Preencha todos os campos para continuar',
            });
          }

          setLoading(false);
        }
        setLoading(false);
      }
    },
    [gender, readTerms, signIn],
  );

  const handleSearchZipCode = useCallback(() => {
    setZipCodeLoading(true);
    const zipCode = formRef.current?.getFieldValue('zipCode');
    if (zipCode > '') {
      api
        .get(`https://viacep.com.br/ws/${zipCode.replace('-', '')}/json/`)
        .then(response => {
          if (response.data.logradouro) {
            formRef.current?.setFieldValue('address', response.data.logradouro);
            formRef.current?.setFieldValue('district', response.data.bairro);
            formRef.current?.setFieldValue('city', response.data.localidade);
            formRef.current?.setFieldValue('uf', response.data.uf);
            // formRef.current?.setFieldValue('zipCode', zipCode);

            numberRef.current?.focus();
            setZipCodeLoading(false);
          }
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text2: 'CEP não encontrado',
          });
          setZipCodeLoading(false);
        });
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled" testID="container">
        <Modal isVisible={termsModal}>
          <TermsModal onClose={() => setTermsModal(false)} />
        </Modal>
        <Modal isVisible={policyModal}>
          <PolicyPrivacyModal onClose={() => setPolicyModal(false)} />
        </Modal>
        <Container>
          <Header>
            <BackButton onPress={() => navigation.goBack()}>
              <FeatherIcon
                name="chevron-left"
                color={Colors.primary}
                size={RFValue(32)}
              />
            </BackButton>
            <RaquetImage source={logo_blue} style={{ resizeMode: 'contain' }} />
          </Header>
          <Content>
            <CreateAccountLabel>Faça seu cadastro</CreateAccountLabel>
            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{ width: '100%', marginBottom: '20%' }}
            >
              <Input
                name="name"
                icon="user"
                password={false}
                placeholder="Nome Completo"
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => ssnRef.current?.focus()}
                testID="name"
              />
              <MaskedInput
                name="ssn"
                type="cpf"
                icon="credit-card"
                placeholder="CPF"
                ref={ssnRef}
                keyboardType="numeric"
                maxLength={14}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                testID="ssn"
              />
              <Input
                name="email"
                icon="mail"
                password={false}
                placeholder="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                ref={emailRef}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => cellphoneRef.current?.focus()}
                testID="email"
              />
              <MaskedInput
                name="cellphone"
                type="cellphone"
                icon="phone"
                placeholder="WhatsApp"
                ref={cellphoneRef}
                keyboardType="numeric"
                maxLength={14}
                returnKeyType="next"
                onSubmitEditing={() => zipCodeRef.current?.focus()}
                testID="cellphone"
              />
              <ZipCodeContainer>
                <ZipCodeView>
                  <MaskedInput
                    name="zipCode"
                    type="cep"
                    icon="navigation"
                    placeholder="CEP"
                    ref={zipCodeRef}
                    keyboardType="numeric"
                    maxLength={14}
                    returnKeyType="send"
                    onSubmitEditing={() => handleSearchZipCode()}
                    testID="zipCode"
                  />
                </ZipCodeView>
                <SeachZipCodeButton
                  onPress={() => handleSearchZipCode()}
                  testID="searchZipCode"
                >
                  {zipCodeLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <FeatherIcon
                      name="search"
                      color="#fff"
                      size={RFValue(20)}
                    />
                  )}
                </SeachZipCodeButton>
              </ZipCodeContainer>
              <Input
                name="address"
                icon="navigation"
                password={false}
                placeholder="Logradouro"
                ref={addressRef}
                returnKeyType="next"
                onSubmitEditing={() => numberRef.current?.focus()}
              />
              <Input
                name="number"
                icon="navigation"
                password={false}
                placeholder="Número"
                ref={numberRef}
                returnKeyType="next"
                onSubmitEditing={() => complementRef.current?.focus()}
                testID="number"
              />
              <Input
                name="complement"
                icon="navigation"
                password={false}
                placeholder="Complemento"
                ref={complementRef}
                returnKeyType="next"
                onSubmitEditing={() => districtRef.current?.focus()}
                testID="complement"
              />
              <Input
                name="district"
                icon="navigation"
                password={false}
                placeholder="Bairro"
                ref={districtRef}
                returnKeyType="next"
                onSubmitEditing={() => ufRef.current?.focus()}
              />
              <StateCityContainer>
                <StateContainer>
                  <Input
                    name="uf"
                    icon="navigation"
                    password={false}
                    placeholder="UF"
                    maxLength={2}
                    ref={ufRef}
                    returnKeyType="next"
                    onSubmitEditing={() => cityRef.current?.focus()}
                  />
                </StateContainer>
                <CityContainer>
                  <Input
                    name="city"
                    icon="navigation"
                    password={false}
                    placeholder="Cidade"
                    ref={cityRef}
                    returnKeyType="next"
                    onSubmitEditing={() => birthDateRef.current?.focus()}
                  />
                </CityContainer>
              </StateCityContainer>
              <MaskedInput
                name="birthDate"
                type="data"
                icon="calendar"
                placeholder="Data de nascimento"
                ref={birthDateRef}
                keyboardType="numeric"
                maxLength={10}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                testID="birthDate"
              />
              <ModalDropdown
                options={GetGendersList()}
                defaultValue="Sexo"
                animated
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#999',
                  height: RFValue(45),
                  paddingLeft: RFValue(14),
                  justifyContent: 'center',
                  marginBottom: RFValue(10),
                }}
                defaultTextStyle={{ color: '#999', fontSize: RFValue(14) }}
                dropdownStyle={{ width: '50%' }}
                dropdownTextStyle={{ width: '100%', fontSize: RFValue(14) }}
                textStyle={{ color: '#000' }}
                onSelect={item => setGender(GetGendersList()[Number(item)])}
                testID="sexDropdown"
                dropdownListProps={{ testID: 'dropdownItem' }}
              />
              <Input
                name="password"
                ref={passwordRef}
                password
                textContentType="oneTimeCode"
                icon="lock"
                autoCapitalize="none"
                placeholder="Senha"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                testID="password"
              />
              <Input
                name="passwordConfirm"
                ref={confirmPasswordRef}
                password
                textContentType="oneTimeCode"
                icon="lock"
                autoCapitalize="none"
                placeholder="Confirmar senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                testID="confirmPassword"
              />
              <TermsPrivacyContainer>
                <Switch
                  trackColor={{ false: '#767577', true: Colors.primary }}
                  thumbColor={readTerms ? '#fff' : '#fff'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setReadTerms(!readTerms)}
                  value={readTerms}
                  testID="readTerms"
                />
                <ReadTermsText>
                  Li e concordo com os
                  <TermsButton onPress={() => setTermsModal(true)}>
                    <TermsButtonText>TERMOS DE USO</TermsButtonText>
                  </TermsButton>
                  e a{' '}
                  <TermsButton onPress={() => setPolicyModal(true)}>
                    <TermsButtonText>POLÍTICA DE PRIVACIDADE</TermsButtonText>
                  </TermsButton>
                  do app AHAYA
                </ReadTermsText>
              </TermsPrivacyContainer>
              <Button
                title="submitButton"
                loading={loading}
                onPress={() => formRef.current?.submitForm()}
                testID="submitButton"
              >
                Cadastrar
              </Button>
            </Form>
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileSignUp;
