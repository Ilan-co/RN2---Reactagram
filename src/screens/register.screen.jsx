import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Image, Text, TextInput, Button, View, TouchableOpacity, Alert,
} from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';
import { register } from '../services/user.service';
import { AuthContext } from '../helpers/AuthProvider';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilPicture, setProfilPicture] = useState('');
  const [location, setLocation] = useState('');
  const { userLogged, setUserLogged } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (await AsyncStorage.getItem('UID')) {
        setUserLogged(true);
        if (userLogged) {
          navigation.navigate('Feed');
        }
      } else {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('', 'Vous n\'avez pas les permissions');
          return;
        }
        const coordinates = await Location.getCurrentPositionAsync({});
        const objCoord = {
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        };
        const data = await Location.reverseGeocodeAsync(objCoord);
        setLocation(`${data[0].street} - ${data[0].city}`);
      }
    })();
  }, []);

  function handleSubmit() {
    register(email, password, profilPicture, location).then((user) => {
      if (user) {
        navigation.navigate('Login');
        setEmail('');
        setPassword('');
        setLocation('');
        setProfilPicture('');
      }
    });
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: profilPicture !== '' ? profilPicture : null,
        }}
      />
      <View style={styles.btnPick}>
        <TouchableOpacity
          onPress={async () => {
            const result = await ExpoImagePicker.launchCameraAsync();
            setProfilPicture(result.uri);
          }}
        >
          <Text style={styles.singleBtn}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const result = await ExpoImagePicker.launchImageLibraryAsync();
            setProfilPicture(result.uri);
          }}
        >
          <Text style={styles.singleBtn}>Galerie</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        textContentType="emailAddress"
        style={styles.inpForm}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Mot de passe"
        textContentType="password"
        secureTextEntry
        style={styles.inpForm}
      />
      <View style={styles.btnSubmit}>
        <Button
          color="#006767"
          title="Inscription"
          onPress={() => handleSubmit()}
        />
        <View style={{ height: 10 }} />
        <Button
          color="#006767"
          title="J'ai déjà un compte"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

RegisterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default RegisterScreen;
