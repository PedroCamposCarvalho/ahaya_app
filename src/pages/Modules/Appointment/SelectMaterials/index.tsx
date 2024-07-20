/* eslint-disable no-plusplus */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import formatPrice from '@app/utils/formatPrice';
import { useAuth } from '@app/hooks/auth';
import {
  useAppointmentContext,
  HoursProps,
  MaterialsProps,
} from '@app/hooks/appointment';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  LoadingContainer,
  DescriptionText,
  Content,
  HoursList,
  HousDetailsView,
  HourContainer,
  HourDetailsContainer,
  HourCourt,
  HourStartDate,
  HourFinishDate,
  HourNumberOfPlayersContainer,
  NumberOfPlayersLabel,
  PlayerAmountContainer,
  NumberOfPlayersAmount,
  MaterialsButton,
  MaterialsButtonText,
  MaterialsList,
  MaterialContainer,
  MaterialName,
  MaterialPrice,
  MaterialAmount,
  ContinueButton,
  ContinueButtonText,
  AddMaterialButton,
  RemoveMaterialButton,
  FinalPriceText,
  Footer,
} from './styles';

const SelectMaterials: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const {
    appointment,
    hours,
    materials,
    addMaterial,
    removeMaterial,
    addPlayer,
    removePlayer,
  } = useAppointmentContext();

  const [loading, setLoading] = useState(false);

  const [temp, setTemp] = useState(false);

  const handleAddMaterial = useCallback(
    (id_hour: string, id_material: string) => {
      addMaterial(id_hour, id_material);
      setTemp(!temp);
    },
    [addMaterial, temp],
  );

  const handleRemoveMaterial = useCallback(
    (id_hour: string, id_material: string, amount: number) => {
      if (amount > 0) {
        removeMaterial(id_hour, id_material);
        setTemp(!temp);
      }
    },
    [removeMaterial, temp],
  );

  const handleAddPlayer = useCallback(
    (id_hour: string) => {
      addPlayer(id_hour);
      setTemp(!temp);
    },
    [addPlayer, temp],
  );

  const handleRemovePlayer = useCallback(
    (id_hour: string) => {
      removePlayer(id_hour);
      setTemp(!temp);
    },
    [removePlayer, temp],
  );

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FeatherIcon name="chevron-down" size={RFValue(20)} color="#fff" />
          </BackButton>
          <HeaderTitle>Escolha os Materiais</HeaderTitle>
          <BackButton>
            <FeatherIcon
              name="chevron-down"
              size={RFValue(20)}
              color="transparent"
            />
          </BackButton>
        </Header>
        <DescriptionText>
          Para cada horário, escolha os materiais desejados
        </DescriptionText>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <>
            <Content>
              <HoursList
                data={hours}
                keyExtractor={item => item.court_name}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: hour, index }) => (
                  <HourContainer>
                    <HousDetailsView>
                      <HourDetailsContainer>
                        <HourCourt>{hour.court_name}</HourCourt>
                        <HourStartDate>
                          Início:{' '}
                          {format(hour.start_date, '  dd/MM/yyyy HH:mm')}
                        </HourStartDate>
                        <HourFinishDate>
                          Fim:{' '}
                          {format(hour.finish_date, '    dd/MM/yyyy HH:mm')}
                        </HourFinishDate>
                      </HourDetailsContainer>
                      <HourNumberOfPlayersContainer>
                        <NumberOfPlayersLabel>
                          N˚ de jogadores
                        </NumberOfPlayersLabel>
                        <PlayerAmountContainer>
                          <RemoveMaterialButton
                            onPress={() => handleRemovePlayer(hour.id)}
                          >
                            <FeatherIcon name="minus" color="#fff" />
                          </RemoveMaterialButton>
                          <NumberOfPlayersAmount>
                            {hour.number_of_players}
                          </NumberOfPlayersAmount>
                          <AddMaterialButton
                            onPress={() => handleAddPlayer(hour.id)}
                          >
                            <FeatherIcon name="plus" color="#fff" />
                          </AddMaterialButton>
                        </PlayerAmountContainer>
                      </HourNumberOfPlayersContainer>
                    </HousDetailsView>
                    <MaterialsButton>
                      <MaterialsButtonText>Materiais:</MaterialsButtonText>
                      <MaterialsList
                        data={materials.filter(
                          item => item.id_hour === hour.id,
                        )}
                        keyExtractor={item => item.id}
                        renderItem={({ item: material }) => (
                          <MaterialContainer>
                            <MaterialName>{material.material}</MaterialName>
                            <MaterialPrice>
                              {formatPrice(Number(material.price))}
                            </MaterialPrice>
                            <RemoveMaterialButton
                              onPress={() =>
                                handleRemoveMaterial(
                                  hour.id,
                                  material.id,
                                  material.amount,
                                )
                              }
                            >
                              <FeatherIcon name="minus" color="#fff" />
                            </RemoveMaterialButton>
                            <MaterialAmount>{material.amount}</MaterialAmount>
                            <AddMaterialButton
                              onPress={() =>
                                handleAddMaterial(hour.id, material.id)
                              }
                            >
                              <FeatherIcon name="plus" color="#fff" />
                            </AddMaterialButton>
                          </MaterialContainer>
                        )}
                      />
                    </MaterialsButton>
                  </HourContainer>
                )}
              />
            </Content>
            <Footer>
              <FinalPriceText>
                {`Preço final: ${formatPrice(appointment.finalPrice)}`}
              </FinalPriceText>
              <ContinueButton
                onPress={() => navigation.navigate('AppointmentResume')}
              >
                <ContinueButtonText>Continuar</ContinueButtonText>
              </ContinueButton>
            </Footer>
          </>
        )}
      </Container>
    </LinearGradient>
  );
};

export default SelectMaterials;
