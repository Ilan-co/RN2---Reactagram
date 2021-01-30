import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button, View } from 'react-native';
import styles from '../style';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    navigation.navigate('Feed');
  }

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
          onPress={() => login()}
        />
        <View style={{ height: 10 }} />
        <Button
          color="#006767"
          title="Créer un compte"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginScreen;
