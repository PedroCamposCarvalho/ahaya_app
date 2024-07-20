import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AnimatedNumbers from '@app/components/AnimatedNumbers';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import { useScoreContext } from '@app/hooks/score';
import {
  Container,
  Header,
  LoadingContainer,
  ScoreView,
  ScoreLabel,
  SeeHistoryButton,
  SeeHistoryButtonText,
  Content,
  ContentTitle,
  ModuleContainer,
  ModuleImage,
  ModuleContent,
  ModuleName,
  ModuleDescription,
} from './styles';

const UserScore: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { scores, userPoints } = useScoreContext();

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <ScoreView>
            <ScoreLabel>Seu saldo de pontos:</ScoreLabel>
            <AnimatedNumbers value={userPoints} />
          </ScoreView>
        </Header>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <Content>
            <ContentTitle>Como usar seus pontos?</ContentTitle>
            <FlatList
              data={scores}
              style={{ height: '100%', width: '100%' }}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: module }) => (
                <ModuleContainer>
                  <ModuleImage
                    source={{ uri: module.image }}
                    style={{ resizeMode: 'contain' }}
                  />
                  <ModuleContent>
                    <ModuleName>{module.module}</ModuleName>
                    <ModuleDescription>{module.description}</ModuleDescription>
                  </ModuleContent>
                </ModuleContainer>
              )}
            />
          </Content>
        )}
      </Container>
    </LinearGradient>
  );
};

export default UserScore;
