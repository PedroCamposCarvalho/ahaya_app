/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import React, { useCallback, useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FakeCurrencyInput } from 'react-native-currency-input';
import api from '../../../../../services/api';
import getCourtProps from '../../../../../utils/getCourtProps';
import {
  Container,
  Header,
  Title,
  CloseButton,
  Content,
  Icon,
  InitialDateView,
  InitialDateTitle,
  LimitView,
  Limit,
  PriceView,
  PriceTitle,
  HoursView,
  InitialHourView,
  InitialHour,
  FinalHourView,
  FinalHour,
  FinishButton,
  FinishButtonText,
  CourtsContainer,
  CourtsTitle,
  CourtView,
  CourtsContent,
  CourtOption,
  CourtNumber,
} from './styles';

interface PageProps {
  closeModal: () => void;
}

const NewDayUseModal: React.FC<PageProps> = ({ closeModal }) => {
  const [initialDate, setInitialDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appointmentType, setAppontmentType] = useState('');
  const [clientName, setClientName] = useState('');
  const [limit, setLimit] = useState('');
  const [initialHour, setInitialHour] = useState('');
  const [finalHour, setFinalHour] = useState('');
  const [courtNumber, setCourtNumber] = useState(0);
  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      setShowDatePicker(false);
      if (date) {
        setInitialDate(date);
      }
    },
    [],
  );

  const handleFinish = useCallback(() => {
    try {
      if (Number(initialHour) >= Number(finalHour)) {
        throw new Error(
          'Data final não pode ser maior ou igual a data inicial',
        );
      }

      if (courtNumber === 0) {
        throw new Error('Selecione uma quadra');
      }
      const hoursDifference = Number(finalHour) - Number(initialHour);

      let novaData = new Date(initialDate);
      api.post('/dayUse/create', {
        id_court: getCourtProps(courtNumber)?.id_court,
        price,
        start_date: new Date(novaData.setHours(Number(initialHour))),
        finish_date: new Date(novaData.setHours(Number(finalHour))),
        limit,
      });
      closeModal();
    } catch (error) {}
  }, [
    limit,
    initialHour,
    finalHour,
    price,
    initialDate,
    courtNumber,
    closeModal,
  ]);

  const handleInitialHourChange = useCallback((text: string) => {
    if (Number(text) >= 25) {
      setInitialHour('24');
    } else {
      setInitialHour(text);
    }
  }, []);

  const handleFinalHourChange = useCallback((text: string) => {
    if (Number(text) >= 25) {
      setFinalHour('24');
    } else {
      setFinalHour(text);
    }
  }, []);

  return (
    <Container>
      <Header>
        <Title>Novo Day Use</Title>
        <CloseButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </CloseButton>
      </Header>
      <Content>
        <InitialDateView>
          <InitialDateTitle>Data</InitialDateTitle>
          <DateTimePicker
            mode="date"
            textColor="#000"
            value={initialDate}
            onChange={handleDateChanged}
            style={{
              alignSelf: 'center',
              width: '100%',
              borderRadius: 10,
              marginTop: 5,
              height: RFValue(40),
            }}
          />
        </InitialDateView>
        <PriceView>
          <PriceTitle>Preço</PriceTitle>
          <FakeCurrencyInput
            containerStyle={{
              width: '100%',
              height: RFValue(50),
              paddingRight: 16,
              paddingLeft: 10,
              borderRadius: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#999',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            style={{
              color: '#999',
              fontSize: RFValue(14),
              fontFamily: 'Arial',
            }}
            value={price}
            onChangeValue={value => (value ? setPrice(value) : setPrice(0))}
            unit="R$ "
            delimiter="."
            separator=","
            precision={2}
          />
        </PriceView>
        <LimitView>
          <Icon name="list" color="#999" size={RFValue(16)} />
          <Limit
            placeholder="Limite"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={limit}
            onChangeText={text => setLimit(text)}
          />
        </LimitView>
        <HoursView>
          <InitialHourView>
            <Icon name="clock" color="#999" size={RFValue(16)} />
            <InitialHour
              placeholder="Início"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={2}
              value={initialHour}
              onChangeText={text => handleInitialHourChange(text)}
            />
          </InitialHourView>
          <FinalHourView>
            <Icon name="clock" color="#999" size={RFValue(16)} />
            <FinalHour
              placeholder="Fim"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={2}
              value={finalHour}
              onChangeText={text => handleFinalHourChange(text)}
            />
          </FinalHourView>
        </HoursView>

        <CourtsContainer>
          <CourtsTitle>Selecione a quadra</CourtsTitle>
          <CourtsContent>
            <CourtView>
              <CourtOption
                number={1}
                selected={courtNumber === 1}
                onPress={() => setCourtNumber(1)}
              />
              <CourtNumber number={1}>1</CourtNumber>
            </CourtView>
            <CourtView>
              <CourtOption
                number={2}
                selected={courtNumber === 2}
                onPress={() => setCourtNumber(2)}
              />
              <CourtNumber number={2}>2</CourtNumber>
            </CourtView>
            <CourtView>
              <CourtOption
                number={3}
                selected={courtNumber === 3}
                onPress={() => setCourtNumber(3)}
              />
              <CourtNumber number={3}>3</CourtNumber>
            </CourtView>
          </CourtsContent>
          <CourtsContent>
            <CourtView>
              <CourtOption
                number={4}
                selected={courtNumber === 4}
                onPress={() => setCourtNumber(4)}
              />
              <CourtNumber number={4}>4</CourtNumber>
            </CourtView>
          </CourtsContent>
        </CourtsContainer>
        <FinishButton onPress={() => handleFinish()}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <FinishButtonText>Concluir</FinishButtonText>
          )}
        </FinishButton>
      </Content>
    </Container>
  );
};

export default NewDayUseModal;
