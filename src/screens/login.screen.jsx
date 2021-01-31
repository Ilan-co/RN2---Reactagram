import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button, View } from 'react-native';
import styles from '../style';
import { login } from '../services/user.service';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    login(email, password).then((user) => {
      if (user) {
        navigation.navigate('Feed');
        setEmail('');
        setPassword('');
      }
    });
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
          onPress={() => handleSubmit()}
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
