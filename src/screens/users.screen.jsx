import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text, FlatList,
} from 'react-native';
import styles from '../style';
import { getUsers } from '../services/user.service';

const Item = ({ image, email, location }) => (
  <View style={styles.itemUser}>
    <Image
      style={styles.imgUser}
      source={{ uri: image }}
    />
    <View style={{ flexDirection: 'column', marginVertical: 10 }}>
      <Text style={styles.title}>{email}</Text>
      <Text style={styles.title}>{location}</Text>
    </View>
  </View>
);

const UsersScreen = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
      setUsers(await getUsers());
    })();
  }, []);

  const renderItem = ({ item }) => (
    <Item
      image={item.picture}
      email={item.name}
      location={item.location}
    />
  );

  return (
    <View style={styles.containerList}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(_, index) => `user-${index}`}
      />
    </View>
  );
};

Item.propTypes = {
  image: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default UsersScreen;
