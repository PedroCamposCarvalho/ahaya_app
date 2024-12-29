import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface PageProps {
  flag: string;
}

const ImageCardFlag: React.FC<PageProps> = ({ flag }) => {
  const styles = StyleSheet.create({
    image: {
      height: RFValue(40),
      width: RFValue(60),
      zIndex: 5,
    },
  });

  switch (flag) {
    case 'visa':
      return (
        <View>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://app-arenaibirapuera.s3.amazonaws.com/stp_card_visa.png',
            }}
          />
        </View>
      );
    case 'diners':
      return (
        <Image
          style={styles.image}
          source={{
            uri:
              'https://app-arenaibirapuera.s3.amazonaws.com/stp_card_diners.png',
          }}
        />
      );
    case 'amex':
      return (
        <Image
          style={styles.image}
          source={{
            uri:
              'https://app-arenaibirapuera.s3.amazonaws.com/stp_card_amex.png',
          }}
        />
      );
    case 'discover':
      return (
        <Image
          style={styles.image}
          source={{
            uri:
              'https://app-arenaibirapuera.s3.amazonaws.com/stp_card_discover.png',
          }}
        />
      );

    case 'jcb':
      return (
        <Image
          style={styles.image}
          source={{
            uri:
              'https://app-arenaibirapuera.s3.amazonaws.com/stp_card_jcb.png',
          }}
        />
      );
    case 'mastercard':
      return (
        <Image
          style={styles.image}
          source={{
            uri:
              'https://app-arenaibirapuera.s3.amazonaws.com/stp_card_master.png',
          }}
        />
      );
    default:
      return (
        <Image
          style={styles.image}
          source={{
            uri:
              'https://app-arenaibirapuera.s3.amazonaws.com/stp_card_unknown.png',
          }}
        />
      );
  }
};

export default ImageCardFlag;
