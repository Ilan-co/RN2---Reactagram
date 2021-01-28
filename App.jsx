import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/register.screen';
import LoginScreen from './src/screens/login.screen';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{ headerStyle: { backgroundColor: '#008080' }, headerTitleStyle: { color: 'white' } }}
    >
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
