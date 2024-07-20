import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { Container, Title, CloseButton } from "./styles";

interface PageProps {
  title: string;
  closeModal: () => void;
}

const ModalHeader: React.FC<PageProps> = ({ title, closeModal }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <CloseButton onPress={() => closeModal()}>
        <MaterialIcon name="close" color="#fff" size={RFValue(18)} />
      </CloseButton>
    </Container>
  );
};

export default ModalHeader;
