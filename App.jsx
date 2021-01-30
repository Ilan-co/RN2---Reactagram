import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/register.screen';
import LoginScreen from './src/screens/login.screen';
import BottomNav from './src/navigation/bottom-nav.component';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Register"
      headerMode="none"
    >
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Feed"
        component={BottomNav}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
