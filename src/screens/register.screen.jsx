import React, { useState, useEffect } from 'react';
import {
  Image, StyleSheet, Text, TextInput, Button, View, TouchableOpacity,
} from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inpForm: {
    backgroundColor: '#ffffff',
    width: 200,
    padding: 10,
    marginBottom: 10,
  },
  btnPick: {
    flexDirection: 'row',
    padding: 20,
  },
  singleBtn: {
    backgroundColor: '#0067',
    color: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  btnSubmit: {
    width: 150,
  },
  img: {
    backgroundColor: '#000000',
    width: 150,
    height: 150,
  },
});

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilPicture, setProfilPicture] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Pas les permissions');
        return;
      }
      const coordinates = await Location.getCurrentPositionAsync({});
      const objCoord = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      };
      const location = await Location.reverseGeocodeAsync(objCoord);
      setLocation(`${location[0].street} - ${location[0].city}`);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: profilPicture,
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
        style={styles.inpForm}
      />
      <View style={styles.btnSubmit}>
        <Button
          color="#006767"
          title="Inscription"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
