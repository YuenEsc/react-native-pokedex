import React from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import globalStyles from '../utils/globalStyles';

const LoadingScreen = () => {
  return (
    <SafeAreaView style={globalStyles.CenteredLayoutContainer}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

export default LoadingScreen;
