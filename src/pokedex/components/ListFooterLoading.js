import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const LoadingList = () => {
  return (
    <View style={styles.Container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingList;
