/* eslint-disable prefer-const */
/* eslint-disable no-let */
import React, { useEffect, useCallback, useState } from 'react';
import RNCalendarEvents from 'react-native-calendar-events';
import { differenceInHours, parseISO } from 'date-fns';
import api from '../../../../services/api';
import { Container, TempButton } from './styles';

const MigrateCalendar: React.FC = () => {
  useEffect(() => {
    RNCalendarEvents.requestPermissions((readOnly = false));
  }, []);

  function getCourtId(id_court: string): string {
    switch (id_court) {
      case 'Areia 1':
        return 'ae9dcc52-9b3c-4e22-a582-abfe66c569b7';
      case 'Quadra 1':
        return 'ae9dcc52-9b3c-4e22-a582-abfe66c569b7';
      case 'Areia 2':
        return 'a2d3cc4a-c941-42b9-8857-88c5b31665d2';
      case 'Quadra 2':
        return 'a2d3cc4a-c941-42b9-8857-88c5b31665d2';
      case 'Areia 3':
        return 'eb78a5a6-ccff-46a6-aa97-112550171961';
      case 'Quadra 3':
        return 'eb78a5a6-ccff-46a6-aa97-112550171961';
      case 'Areia 4':
        return '655e6ee8-0a03-40ea-9536-7d6f40c85066';
      case 'Quadra 4':
        return '655e6ee8-0a03-40ea-9536-7d6f40c85066';
      case 'Areia 5':
        return 'd2a2f592-a8f5-49b3-99e4-2be36fedf2fa';
      case 'Quadra 5':
        return 'd2a2f592-a8f5-49b3-99e4-2be36fedf2fa';
      case 'Areia 6':
        return '53eb8066-3fa1-4c3a-ba07-6ad2d36c59ab';
      case 'Quadra 6':
        return '53eb8066-3fa1-4c3a-ba07-6ad2d36c59ab';
      case 'Areia 7':
        return '5c1059c7-1b6c-4e25-b16d-dcc8287f6a83';
      case 'Quadra 7':
        return '5c1059c7-1b6c-4e25-b16d-dcc8287f6a83';
      case 'Areia 8':
        return '787bd5d2-a4f0-43b6-9838-56dd48be3f4b';
      case 'Quadra 8':
        return '787bd5d2-a4f0-43b6-9838-56dd48be3f4b';
      case 'Areia 9':
        return '14dbc39b-2f6a-4b0c-ab2a-6f434bbe2bc0';
      case 'Quadra 9':
        return '14dbc39b-2f6a-4b0c-ab2a-6f434bbe2bc0';
      default:
        '';
    }
  }

  const getCalendarEvents = useCallback(() => {
    const startDate = new Date(2021, 1, 1, 0, 0, 0, 0);
    const endDate = new Date(2021, 12, 1, 0, 0, 0, 0);

    RNCalendarEvents.fetchAllEvents(
      startDate.toISOString(),
      endDate.toISOString(),
    ).then(response => {
      for (let i = 0; i < response.length; i++) {
        const newDate = new Date(response[i].startDate);
        const finalDate = new Date(response[i].endDate);
        let diff = (finalDate.getTime() - newDate.getTime()) / 1000;
        diff /= 60 * 60;
        const hoursDifference = Math.abs(Math.round(diff));
        for (let j = 0; j < hoursDifference; j++) {
          let loopday = new Date(newDate);
          if (response[i].title.trim() !== '') {
            api
              .post('/appointments/create', {
                id_court: getCourtId(
                  String(response[i].calendar?.title.trim()),
                ),
                price: 0,
                start_date: new Date(newDate).setHours(loopday.getHours() + j),
                hours: [
                  {
                    hour: new Date(newDate).getHours() + j,
                    date: new Date(newDate).setHours(loopday.getHours() + j),
                  },
                ],
                users: [{ id_user: '74762c1b-b67a-4ff8-8945-ad9bffadeae8' }],
                materials: [null],
                sequencehours: null,
                id_transaction: '',
                observation: response[i].title.trim(),
              })
              .then(response => {})
              .catch(error => {});
          }
        }
      }
    });
  }, []);

  return (
    <Container>
      <TempButton onPress={() => getCalendarEvents()} />
    </Container>
  );
};

export default MigrateCalendar;
