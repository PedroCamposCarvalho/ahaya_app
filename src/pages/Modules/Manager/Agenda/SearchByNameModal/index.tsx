import React, { useEffect } from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

interface PageProps {
  closeModal: () => void;
  observation: string;
}

const SearchByNameModal: React.FC<PageProps> = ({
  closeModal,
  observation,
}) => <View />;

export default SearchByNameModal;
