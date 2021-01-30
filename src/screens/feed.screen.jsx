import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text, FlatList,
} from 'react-native';
import styles from '../style';

const DATA = [
  {
    img: 'https://reactjs.org/logo-og.png',
    location: 'a',
  },
  {
    img: 'https://reactjs.org/logo-og.png',
    location: 'b',
  },
  {
    img: 'https://reactjs.org/logo-og.png',
    location: 'c',
  },
  {
    img: 'https://reactjs.org/logo-og.png',
    location: 'd',
  },
];

const Item = ({ image, location }) => (
  <View style={styles.itemFeed}>
    <Image
      style={styles.img}
      source={{ uri: image }}
    />
    <Text style={styles.title}>{location}</Text>
  </View>
);

const FeedScreen = () => {
  const [feed, setFeed] = useState();

  useEffect(() => {
    // set Feed here
    setFeed(DATA);
  }, []);

  const renderItem = ({ item }) => (
    <Item
      image={item.img}
      location={item.location}
    />
  );

  return (
    <View style={styles.containerList}>
      <FlatList
        data={feed}
        renderItem={renderItem}
        keyExtractor={(_, index) => `feed-item-${index}`}
      />
    </View>
  );
};

Item.propTypes = {
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default FeedScreen;
