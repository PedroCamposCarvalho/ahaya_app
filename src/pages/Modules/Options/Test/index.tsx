import React, { useCallback, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { addDays, format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';

// import { Container } from './styles';

const Test: React.FC = () => {
  function getCourtId(id_court: string): string {
    switch (id_court) {
      case 'Quadra 1':
        return 'ae9dcc52-9b3c-4e22-a582-abfe66c569b7';

      case 'Quadra 2':
        return 'a2d3cc4a-c941-42b9-8857-88c5b31665d2';

      case 'Quadra 3':
        return 'eb78a5a6-ccff-46a6-aa97-112550171961';

      case 'Quadra 4':
        return '655e6ee8-0a03-40ea-9536-7d6f40c85066';

      case 'Quadra 5':
        return 'd2a2f592-a8f5-49b3-99e4-2be36fedf2fa';

      case 'Quadra 6':
        return '53eb8066-3fa1-4c3a-ba07-6ad2d36c59ab';

      case 'Quadra 7':
        return '5c1059c7-1b6c-4e25-b16d-dcc8287f6a83';

      case 'Quadra 8':
        return '787bd5d2-a4f0-43b6-9838-56dd48be3f4b';
      case 'Quadra 9':
        return '14dbc39b-2f6a-4b0c-ab2a-6f434bbe2bc0';
      default:
        '';
    }
  }

  const [date, setDate] = useState(new Date());

  const { user } = useAuth();

  const handleSetHour = useCallback(() => {
    const novaData = new Date(2021, 2, 24, 23, 0, 0, 0);

    while (novaData.getFullYear() < 2022) {
      api.post('/appointments/create', {
        id_court: getCourtId('Quadra 3'),
        price: 0.0,
        start_date: novaData.setHours(novaData.getHours()),
        hours: [
          {
            hour: novaData.getHours(),
            date: novaData.setHours(novaData.getHours()),
          },
        ],
        users: [{ id_user: user.id }],
        materials: [null],
        sequencehours: null,
        id_transaction: '',
        observation: 'Nara Bruno - Mensal',
      });
      novaData.setDate(novaData.getDate() + 7);
    }

    setDate(novaData);
  }, [user.id]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontFamily: 'Arial', fontSize: 30 }}>
        {format(date, " dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss'h'", {
          locale: ptBR,
        })}
      </Text>
      <TouchableHighlight
        onPress={() => handleSetHour()}
        style={{
          height: 60,
          width: '80%',
          backgroundColor: 'green',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Arial',
            fontSize: 20,
          }}
        >
          Set Hour
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default Test;
