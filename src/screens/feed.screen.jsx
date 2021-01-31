import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text, FlatList,
} from 'react-native';
import styles from '../style';
import { getFeed } from '../services/user.service';

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
  const [refreshing, setRefreshing] = useState(false);

  async function getData() {
    setFeed(await getFeed());
  }

  async function handleRefresh() {
    setRefreshing(true);
    await getData();
  }

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const renderItem = ({ item }) => (
    <Item
      image={item.image}
      location={item.location}
    />
  );

  return (
    <View style={styles.containerList}>
      <FlatList
        refreshing={refreshing}
        onRefresh={() => handleRefresh()}
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
