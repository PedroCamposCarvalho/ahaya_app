/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import api from '../../../../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  HeaderButton,
  Content,
  TermsText,
} from './styles';

interface PageProps {
  onClose: () => void;
}

const TermsModal: React.FC<PageProps> = ({ onClose }) => {
  const [terms, setTerms] = useState('');

  useEffect(() => {
    api.get('/terms/find').then(response => {
      setTerms(response.data.terms);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Termos de Uso</HeaderTitle>
        <HeaderButton onPress={() => onClose()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </HeaderButton>
      </Header>
      <Content showsVerticalScrollIndicator={false}>
        <TermsText>
          A locação da quadra destina-se ao uso exclusivo da arena pelo período
          especificado no ato da locação. Ainda que tendo disponibilidade de
          horário antes ou depois do agendado, não fracionamos locações. Assim,
          havendo o interesse e disponibilidade, as horas adicionais devem ser
          pagas integralmente no mesmo dia, por meio do aplicativo. Os horários
          reservados e não utilizados não serão repostos, nem em caso de chuvas,
          pois o uso diante desta condição é de escolha e responsabilidade do
          usuário.{'\n\n'}Regras gerais de cancelamento dos aluguéis das
          quadras, regras de referência, cabendo a cada anfitrião estabelecer
          suas regras próprias, respeitando as referências abaixo:{'\n\n'}·
          Cancelamentos com até 12 horas de antecedência - reembolso de 100%{' '}
          {'\n\n'}· Com até 6 horas de antecedência – reembolso de 50%{'\n\n'} O
          cancelamento deve ser feito pelo próprio aplicativo, que já está
          programado para autorizar cancelamentos, de acordo com as regras
          acima.{'\n\n'} A quadra permanecerá a disposição dos locatários pelo
          período contratado. Caso haja interesse do locatário anterior e/ou
          posterior e, passados 10 minutos, sem qualquer aviso de atraso pelo
          aplicativo ou diretamente à Arena, poderá o horário ser
          disponibilizado aos locatários anteriores ou posteriores.{'\n\n'}Não é
          permitida a entrada coolers e bebidas. Essas devem ser consumidas no
          próprio local. Exceções poderão ser negociadas com os donos das
          arenas.{'\n\n'}A permanência na quadra após o período locado poderá
          ser considerada como nova locação, havendo 5 minutos de tolerância
          antes que haja cobrança, caso não haja locação posterior agendada.
          {'\n\n'}O cliente deve controlar seu período de locação, não sendo
          necessário o aviso por parte da arena locatária de que seu horário
          terminou.{'\n\n'}As áreas comuns não deverão ser usadas para
          confraternizações sem prévio aviso à administração da arena, mesmo que
          estejam dentro do período de locação. A hora da locação de área
          especiais para realização de eventos deverá ser consultado diretamente
          com o administrador da arena.
        </TermsText>
      </Content>
    </Container>
  );
};

export default TermsModal;
