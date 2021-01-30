import React, { useState } from 'react';
import {
  TouchableOpacity, Button, Image, View, Text,
} from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import styles from '../style';

const InsertScreen = () => {
  const [picture, setPicture] = useState();

  function sendPicture() {
    // Send picture here
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
        onPress={() => sendPicture()}
      />
    </View>
  );
};

export default InsertScreen;
