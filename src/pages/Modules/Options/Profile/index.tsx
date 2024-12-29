import React, { useRef, useCallback, useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import ImagePicker from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import ModalDropdown from 'react-native-modal-dropdown';
import api from '@app/services/api';
import { useAuth } from '@app/hooks/auth';
import Input from '@app/components/Input';
import MaskedInput from '@app/components/MaskedInput';
import Button from '@app/components/AuthButton';
import getValidationErrors from '@app/utils/getValidationErrors';
import FormatBirthDate from '@app/utils/SignUp/FormatBirthDate';
import { validateSSN } from '@app/utils/validations';
import GetGendersList from '@app/utils/genderList';
import Toast from 'react-native-toast-message';
import { format } from 'date-fns';
import {
  Container,
  BackButton,
  Header,
  TitleView,
  Title,
  UserAvatarButton,
  UserAvatar,
  CameraButton,
  DeleteAccountButton,
  DeleteAccountButtonText,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  ssn: string;
  cellphone: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  birthDate: Date;
  gender: string;
}

interface PageProps {
  origin: string;
}

const Profile: React.FC = () => {
  const { user, updateUser, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const ssnRef = useRef<TextInput>(null);
  const cellphoneRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);
  const streetRef = useRef<TextInput>(null);
  const numberRef = useRef<TextInput>(null);
  const complementRef = useRef<TextInput>(null);
  const districtRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const birthDateRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [gender, setGender] = useState('');

  const navigation = useNavigation();

  const handleUpdateAvatar = useCallback(() => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ).then(result => {
      if (result === String('granted')) {
        request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        ).then(result2 => {
          if (result2 === String('granted')) {
            ImagePicker.showImagePicker(
              {
                title: 'Selecione um avatar',
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'Usar câmera',
                chooseFromLibraryButtonTitle: 'Escolher da galeria',
              },
              responseImage => {
                if (responseImage.didCancel) {
                  return;
                }

                if (responseImage.error) {
                  Alert.alert('Erro ao atualizar seu avatar.');
                }

                const data = new FormData();

                data.append('avatar', {
                  type: 'image/jpeg',
                  name: `${user.id}.jpg`,
                  uri: responseImage.uri,
                });
                setAvatarLoading(true);
                api
                  .patch(`/users/avatar?user_id=${user.id}`, data)
                  .then(response => {
                    updateUser(response.data);
                    setAvatarLoading(false);
                  });
              },
            );
          } else {
          }
        });
      } else {
      }
    });
  }, [user.id, updateUser]);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          ssn: Yup.string().required().length(14),
          cellphone: Yup.string().required().length(14),
          zipCode: Yup.string().required(),
          street: Yup.string().required(),
          number: Yup.string().required(),
          complement: Yup.string().required(),
          district: Yup.string().required(),
          city: Yup.string().required(),
          state: Yup.string().required(),
          birthDate: Yup.string().required().length(10),
        });

        await schema.validate(data, { abortEarly: false });
        if (validateSSN(data.ssn)) {
          const formData = {
            user_id: user.id,
            name: data.name,
            email: data.email,
            ssn: data.ssn,
            cellphone: data.cellphone,
            zipCode: data.zipCode,
            street: data.street,
            number: data.number,
            complement: data.complement,
            district: data.district,
            city: data.city,
            state: data.state,
            birth_date: FormatBirthDate(String(data.birthDate)),
            gender,
          };
          const response = await api.put('/profile', formData);

          updateUser(response.data);

          navigation.goBack();
        } else {
          ssnRef.current?.focus();
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          setLoading(false);
        }
        setLoading(false);
      }
    },
    [gender, navigation, updateUser, user.id],
  );

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      'Atenção',
      'Deseja realmente deletar sua conta? Esta ação é irreversível!',
      [
        {
          text: 'Não',
          style: 'destructive',
        },
        {
          text: 'Sim',
          style: 'default',
          onPress: () => {
            setDeleteLoading(true);
            api.delete(`/users/deleteUser?id_user=${user.id}`).then(() => {
              signOut();
              Toast.show({
                type: 'success',
                text2: 'Conta deletada com sucesso!',
              });
            });
          },
        },
      ],
      { cancelable: false },
    );
  }, [signOut, user]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="never" testID="container">
          <Container>
            <Header>
              <BackButton onPress={() => navigation.goBack()}>
                <FeatherIcon
                  name="chevron-down"
                  color="#fff"
                  size={RFValue(20)}
                />
              </BackButton>
              <TitleView>
                <Title>Meu perfil</Title>
              </TitleView>
            </Header>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              {avatarLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  {user.avatar_url ? (
                    <UserAvatar
                      source={{
                        uri: user.avatar_url,
                      }}
                    />
                  ) : (
                    <UserAvatar
                      source={{
                        uri: 'https://app-arenaibirapuera.s3.amazonaws.com/avatar.jpg',
                      }}
                    />
                  )}
                </>
              )}

              <CameraButton onPress={handleUpdateAvatar}>
                <FeatherIcon name="camera" color="#006edb" size={25} />
              </CameraButton>
            </UserAvatarButton>

            <Form
              initialData={{
                name: user.name,
                email: user.email,
                ssn: user.ssn,
                cellphone: user.cellphone,
                zipCode: user.zipCode,
                street: user.street,
                number: user.number,
                complement: user.complement,
                district: user.district,
                city: user.city,
                state: user.state,
                birthDate: format(new Date(user.birth_date), 'dd/MM/yyyy'),
              }}
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                marginTop: RFValue(50),
                marginBottom: RFValue(50),
                width: '90%',
                alignSelf: 'center',
              }}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                password={false}
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                password={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => ssnRef.current?.focus()}
              />

              <MaskedInput
                ref={ssnRef}
                keyboardType="numeric"
                type="cpf"
                autoCorrect={false}
                autoCapitalize="none"
                name="ssn"
                icon="credit-card"
                placeholder="CPF"
                returnKeyType="next"
                onSubmitEditing={() => cellphoneRef.current?.focus()}
              />
              <MaskedInput
                ref={cellphoneRef}
                keyboardType="numeric"
                type="cellphone"
                autoCorrect={false}
                autoCapitalize="none"
                name="cellphone"
                icon="phone"
                placeholder="Telefone"
                returnKeyType="next"
                onSubmitEditing={() => zipCodeRef.current?.focus()}
              />
              <MaskedInput
                name="zipCode"
                type="cep"
                icon="navigation"
                placeholder="CEP"
                ref={zipCodeRef}
                keyboardType="numeric"
                maxLength={9}
                returnKeyType="next"
                onSubmitEditing={() => streetRef.current?.focus()}
              />
              <Input
                name="street"
                icon="navigation"
                password={false}
                placeholder="Logradouro"
                autoCapitalize="words"
                autoCorrect={false}
                ref={streetRef}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => numberRef.current?.focus()}
              />
              <Input
                name="number"
                icon="navigation"
                password={false}
                placeholder="Número"
                autoCapitalize="none"
                autoCorrect={false}
                ref={numberRef}
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={() => complementRef.current?.focus()}
              />
              <Input
                name="complement"
                icon="navigation"
                password={false}
                placeholder="Complemento"
                autoCapitalize="none"
                autoCorrect={false}
                ref={complementRef}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => districtRef.current?.focus()}
              />
              <Input
                name="district"
                icon="navigation"
                password={false}
                placeholder="Bairro"
                autoCapitalize="none"
                autoCorrect={false}
                ref={districtRef}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => cityRef.current?.focus()}
              />
              <Input
                name="city"
                icon="navigation"
                password={false}
                placeholder="Cidade"
                autoCapitalize="none"
                autoCorrect={false}
                ref={cityRef}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => stateRef.current?.focus()}
              />
              <Input
                name="state"
                icon="navigation"
                password={false}
                placeholder="UF"
                autoCapitalize="none"
                autoCorrect={false}
                ref={stateRef}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => birthDateRef.current?.focus()}
              />
              <MaskedInput
                name="birthDate"
                type="data"
                icon="calendar"
                placeholder="Data de nascimento"
                ref={birthDateRef}
                keyboardType="numeric"
                maxLength={10}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                testID="birthDate"
              />
              <ModalDropdown
                options={GetGendersList()}
                defaultValue={user.gender}
                animated
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  width: '100%',
                  borderColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#999',
                  height: RFValue(55),
                  paddingLeft: RFValue(14),
                  justifyContent: 'center',
                  marginBottom: RFValue(10),
                }}
                defaultTextStyle={{ color: '#000', fontSize: RFValue(14) }}
                dropdownStyle={{ width: '50%' }}
                dropdownTextStyle={{ width: '100%', fontSize: RFValue(14) }}
                textStyle={{ color: '#000' }}
                onSelect={item => setGender(GetGendersList()[Number(item)])}
                testID="sexDropdown"
                dropdownListProps={{ testID: 'dropdownItem' }}
              />
              <Button
                title="submitButton"
                loading={loading}
                onPress={() => formRef.current?.submitForm()}
              >
                Confirmar mudanças
              </Button>
            </Form>
            <DeleteAccountButton
              disabled={deleteloading}
              onPress={() => handleDeleteAccount()}
              testID="deleteAccountButton"
            >
              {deleteloading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <DeleteAccountButtonText>Deletar conta</DeleteAccountButtonText>
              )}
            </DeleteAccountButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Profile;
