import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../style';
import { getProfil } from '../services/user.service';

const ProfilScreen = () => {
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();
  const [profilPicture, setProfilPicture] = useState();

  useEffect(() => {
    (async () => {
      const user = await getProfil();
      setEmail(user.data().name);
      setLocation(user.data().location);
      setProfilPicture(user.data().picture);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{ uri: profilPicture }}
      />
      <Text style={styles.profilTxt}>{email}</Text>
      <Text style={styles.profilTxt}>{location}</Text>
    </View>
  );
};

export default ProfilScreen;
