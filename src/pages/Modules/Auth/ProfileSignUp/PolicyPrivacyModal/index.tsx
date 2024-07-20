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
        <HeaderTitle>Política de Privacidade</HeaderTitle>
        <HeaderButton onPress={() => onClose()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </HeaderButton>
      </Header>
      <Content showsVerticalScrollIndicator={false}>
        <TermsText>
          O objetivo desta POLÍTICA DE PRIVACIDADE é informar o usuário sobre
          como e para que fins são coletados, processados, armazenados e
          protegidos os dados pessoais fornecidos por meio do aplicativo
          AHAYA. Por “dados pessoais” entende-se todas as informações que
          permitam determinar a identidade do usuário.{'\n\n'}É obrigação do
          usuário ler atentamente esta POLÍTICA DE PRIVACIDADE, que é redigida
          de forma clara e simples, para facilitar o entendimento das
          disposições aqui contidas.{'\n\n'}O usuário declara estar de acordo
          com o fornecimento de seus dados pessoais ao aplicativo AHAYA, no
          modo e para os fins delineados nesta POLÍTICA DE PRIVACIDADE.{'\n\n'}
          Esta POLÍTICA DE PRIVACIDADE pode ser atualizada a qualquer tempo, por
          notificação no aplicativo AHAYA ou por e-mail. Por isso, é
          recomendável que o usuário verifique periodicamente o aplicativo e/ou
          a caixa de entrada de seu e-mail.{'\n\n'} 1. Dados pessoais coletados
          pelo aplicativo {'\n\n'}Nós coletamos informações pessoais sobre você
          quando você usa o aplicativo AHAYA. Sem essas informações, poderemos
          não ser capazes de fornecer todos os serviços que você solicitar.
          Essas informações incluem:{'\n\n'}• Informações de contato, conta,
          informações de perfil. Como nome, sobrenome, número de telefone,
          endereço postal, endereço de email, data de nascimento e foto de
          perfil, dos quais alguns dependerão dos recursos que você usa.{'\n\n'}
          •Verificação de identidade e informações de pagamento. Como imagens do
          seu documento de identificação oficial (conforme permitido pelas leis
          aplicáveis), número de RG ou outras informações de verificação, conta
          bancária ou informações de conta de pagamento.{'\n\n'}• Dados
          relacionados ao uso do aplicativo: histórico de consulta, pesquisa e
          utilização dos serviços.{'\n\n'}1.2 Informações que você opta por nos
          fornecer.{'\n\n'}Você pode optar por nos fornecer informações pessoais
          adicionais. Essas informações podem incluir:{'\n\n'}• Informações de
          perfil adicionais. Como gênero, preferências em geral, cidade e
          descrição pessoal. Algumas dessas informações, conforme indicado nas
          configurações da sua Conta, fazem parte da página do seu perfil
          público e serão publicamente visíveis.{'\n\n'}• Informações de contato
          do catálogo de endereços. Contatos do catálogo de endereços que você
          importa ou insere manualmente.{'\n\n'}• Outras informações. Por
          exemplo, quando você preencher um formulário, adicionar informações à
          sua conta, responder a pesquisas, postar em fóruns da comunidade,
          participar de promoções, se comunicar com nossa equipe de atendimento
          ao cliente ou com outros membros e quando compartilhar sua experiência
          conosco.{'\n\n'}É responsável pela coleta, processamento,
          armazenamento e proteção dos dados pessoais o controlador do
          aplicativo, cujo e-mail para contato alusivo a esta POLÍTICA DE
          PRIVACIDADE, é calango.bt@gmail.com{'\n\n'}3. Finalidade da coleta de
          dados pessoais{'\n\n'}O aplicativo BTPLAY coleta, processa e armazena
          os dados pessoais para fins de garantir o acesso e a utilização do
          aplicativo. Usamos informações pessoais para:{'\n\n'}• permitir que
          você acesse a Plataforma AHAYA e faça e receba pagamentos;{'\n\n'}•
          permitir que você se comunique com outros Membros;{'\n\n'}• realizar
          análises, depurações e realizar pesquisas;{'\n\n'}• fornecer
          atendimento ao cliente;{'\n\n'}• enviar mensagens, atualizações,
          alertas de segurança e notificações da conta para você;{'\n\n'}•
          facilitar seus pedidos e para qualquer outra finalidade que você
          autorize;{'\n\n'}• personalizar e customizar sua experiência com base
          em suas interações com o AHAYA, seu histórico de buscas e reservas,
          suas informações e preferências de perfil e outros conteúdos que você
          enviar;{'\n\n'}4. Armazenamento dos dados{'\n\n'}Os dados pessoais são
          armazenados no banco de dados do aplicativo AHAYA, por tempo
          indeterminado. Em caso de exclusão da conta ou revogação do
          consentimento, todos os dados pessoais serão deletados do banco de
          dados.{'\n\n'}5. Direitos do usuário relativamente aos dados coletados
          {'\n\n'}O usuário poderá, mediante requerimento enviado ao e-mail do
          controlador do aplicativo (item 2 supra), a qualquer tempo:{'\n\n'}•
          Ter acesso aos dados pessoais fornecidos;{'\n\n'}• Revogar
          consentimento quanto ao fornecimento dos dados pessoais;{'\n\n'}•
          Retificar e/ou eliminar dados pessoais imprecisos e incompletos;
          {'\n\n'}• Solicitar a portabilidade de dados.{'\n\n'}6. Proteção dos
          dados pessoais{'\n\n'}O aplicativo AHAYA trata os dados pessoais do
          usuário absolutamente sigilosa, adotando as medidas técnicas e
          organizacionais necessárias, tais como criptografia e autenticação via
          token de acesso exclusivo, para manter a segurança dos dados pessoais
          e evitar sua alteração, perda ou divulgação não autorizada, levando em
          consideração o estado da tecnologia, a natureza dos dados pessoais
          armazenados e os riscos a que estão expostos.{'\n\n'}7. Deveres do
          usuário relativamente aos dados coletados O usuário garante que os
          dados pessoais são verdadeiros, precisos, completos e atualizados.
          Para esses fins, o usuário responderá pela veracidade dos dados que
          ele comunica e os manterá atualizados convenientemente. O Cliente será
          responsável pelas informações falsas, excessivas ou imprecisas que
          fornecer e pelos danos que isso venha a causar ao aplicativo AHAYA
          ou a terceiros{'\n\n'}8. Transferências de negócios. Caso o AHAYA
          realize ou esteja envolvido em qualquer fusão, aquisição,
          reestruturação, venda de ativos, falência ou caso de insolvência,
          poderemos vender, transferir ou compartilhar alguns ou todos os nossos
          ativos, incluindo suas informações relacionadas ou contempladas por
          tais transações. Neste caso, você será notificado antes que suas
          informações pessoais sejam transferidas e estejam sujeitas a uma
          política de privacidade diferente.{'\n\n'}9. ALTERAÇÕES A ESTA
          POLÍTICA DE PRIVACIDADE Nós nos reservamos o direito de modificar esta
          Política de Privacidade a qualquer momento, de acordo com a lei
          aplicável. Se fizermos isso, publicaremos a Política de Privacidade
          revisada e atualizaremos a data de "Última Atualização" na parte
          superior. Em caso de alterações significativas, também forneceremos um
          aviso sobre as modificações, por e-mail, pelo menos 30 (trinta) dias
          antes da data prevista para entrarem em vigor. Caso você não concorde
          com a Política de Privacidade revisada, poderá cancelar sua Conta.
          Caso você não cancele sua Conta antes da data de vigência da Política
          de Privacidade revisada, seu acesso e/ou uso continuado da Plataforma
          BTPLAY estarão sujeitos à Política de Privacidade revisada.
        </TermsText>
      </Content>
    </Container>
  );
};

export default TermsModal;
