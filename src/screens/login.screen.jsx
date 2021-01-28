import React, { useState } from 'react';
import {
  StyleSheet, TextInput, Button, View,
} from 'react-native';

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
  btnSubmit: {
    width: 150,
  },
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
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
          title="Connexion"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
