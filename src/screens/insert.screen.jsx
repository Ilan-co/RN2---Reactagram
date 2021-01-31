import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity, Button, Image, View, Text, Alert,
} from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import styles from '../style';
import { sendPicture } from '../services/user.service';

const InsertScreen = () => {
  const [picture, setPicture] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  function handleSubmit() {
    sendPicture(picture, location);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: picture !== '' ? picture : null,
        }}
      />
      <View style={styles.btnPick}>
        <TouchableOpacity
          onPress={async () => {
            const result = await ExpoImagePicker.launchCameraAsync();
            setPicture(result.uri);
          }}
        >
          <Text style={styles.singleBtn}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const result = await ExpoImagePicker.launchImageLibraryAsync();
            setPicture(result.uri);
          }}
        >
          <Text style={styles.singleBtn}>Galerie</Text>
        </TouchableOpacity>
      </View>
      <Button
        color="#006767"
        title="Poster"
        onPress={() => handleSubmit()}
      />
    </View>
  );
};

export default InsertScreen;
