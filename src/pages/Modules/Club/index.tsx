import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../../hooks/auth';
import UserNotInClub from './UserNotInClub';
import CardClub from './CardClub';

const Club: React.FC = () => {
  const { user } = useAuth();
  return <>{user.vip ? <CardClub /> : <UserNotInClub />}</>;
};

export default Club;
