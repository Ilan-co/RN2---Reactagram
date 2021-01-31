import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, View, Text, Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';
import { getProfil } from '../services/user.service';

const ProfilScreen = ({ navigation }) => {
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

  function handleSubmit() {
    AsyncStorage.removeItem('UID');
    navigation.navigate('Register');
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{ uri: profilPicture }}
      />
      <Text style={styles.profilTxt}>{email}</Text>
      <Text style={styles.profilTxt}>{location}</Text>
      <View style={styles.btnSubmit}>
        <Button
          color="black"
          title="Deconnexion"
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
  );
};

ProfilScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfilScreen;
