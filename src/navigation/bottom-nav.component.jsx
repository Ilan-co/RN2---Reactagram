import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import FeedScreen from '../screens/feed.screen';
import InsertScreen from '../screens/insert.screen';
import ProfilScreen from '../screens/profil.screen';
import UsersScreen from '../screens/users.screen';

const Tab = createBottomTabNavigator();

const BottomNav = () => (
  /* eslint-disable react/prop-types */
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#008080',
    }}
  >
    <Tab.Screen
      name="Actualité"
      component={FeedScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Utilisateurs"
      component={UsersScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-list" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Ajout"
      component={InsertScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-add-circle-sharp" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-person" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomNav;
