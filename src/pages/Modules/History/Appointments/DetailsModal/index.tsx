import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import user_history_appointments from '@app/interfaces/user_history_appointments';
import materials from '@app/interfaces/materials';
import ModalHeader from '@app/components/ModalHeader';
import api from '@app/services/api';
import { FlatList } from 'react-native-gesture-handler';
import { format, addHours, differenceInMinutes } from 'date-fns';
import { useCancelationRuleContext } from '@app/hooks/cancelationRules';
import {
  Container,
  Content,
  CourtName,
  StartDate,
  FinishDate,
  CreatedAt,
  NumberPlayers,
  MaterialsLabel,
  MaterialContainer,
  MaterialName,
  MaterialAmount,
  LoadingContainer,
  CancelationDescription,
  CancelButton,
  CancelButtonText,
} from './styles';

interface ModalProps {
  appointment: user_history_appointments;
  closeModal: () => void;
}

const DetailsModal: React.FC<ModalProps> = ({ appointment, closeModal }) => {
  const [appointmentMaterials, setAppointmentsMaterials] = useState<
    materials[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { cancelationRules } = useCancelationRuleContext();

  useEffect(() => {
    api
      .get(
        `/appointments/findAppointmentMaterials?id_appointment=${appointment.id}`,
      )
      .then(response => {
        setAppointmentsMaterials(response.data);
        setLoading(false);
      });
  }, [appointment]);

  const cancelationText = useMemo(() => {
    const hoursDifference = differenceInMinutes(
      new Date(appointment.start_date),
      new Date(),
    );
    if (hoursDifference < 0) {
      return 'Você não pode cancelar esta reserva';
    }

    return 'teste';
  }, [appointment]);

  return (
    <Container>
      <ModalHeader title="Detalhes" closeModal={() => closeModal()} />
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="#999" size="small" />
        </LoadingContainer>
      ) : (
        <Content>
          <CourtName>{`Quadra: ${appointment.court_name}`}</CourtName>
          <StartDate>
            {`De: ${format(
              new Date(appointment.start_date),
              'dd/MM/yyyy HH:mm',
            )}`}
          </StartDate>
          <FinishDate>
            {`Até: ${format(
              new Date(appointment.finish_date),
              'dd/MM/yyyy HH:mm',
            )}`}
          </FinishDate>
          <CreatedAt>
            {`Criado em: ${format(
              addHours(new Date(appointment.created_at), -3),
              'dd/MM/yyyy HH:mm',
            )}`}
          </CreatedAt>
          <NumberPlayers>{`Jogadores: ${appointment.number_of_players}`}</NumberPlayers>
          <MaterialsLabel>Materiais: </MaterialsLabel>
          <FlatList
            data={appointmentMaterials}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: material }) => (
              <MaterialContainer>
                <MaterialName>{material.material}</MaterialName>
                <MaterialAmount>{material.amount}</MaterialAmount>
              </MaterialContainer>
            )}
          />
          {/* {cancelationRules.length > 0 && (
            <>
              <CancelationDescription>{cancelationText}</CancelationDescription>
              {differenceInMinutes(
                new Date(appointment.start_date),
                new Date(),
              ) > 0 && (
                <CancelButton>
                  <CancelButtonText>Cancelar reserva</CancelButtonText>
                </CancelButton>
              )}
            </>
          )} */}
        </Content>
      )}
    </Container>
  );
};

export default DetailsModal;
