import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../style';

const ProfilScreen = () => {
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();
  const [profilPicture, setProfilPicture] = useState();

  useEffect(() => {
    // get profil and set data here
    setEmail('hihi@epijsdqd.dijsq');
    setLocation('France');
    setProfilPicture('https://reactjs.org/logo-og.png');
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{ uri: profilPicture }}
      />
      <Text>{email}</Text>
      <Text>{location}</Text>
    </View>
  );
};

export default ProfilScreen;
