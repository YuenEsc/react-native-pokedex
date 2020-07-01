import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

const sleepingPikachuImage = require('../../../assets/images/sleeping_pikachu.jpg');

const ErrorScreen = () => {
  return (
    <React.Fragment>
      <View style={styles.ErrorMessageContainer}>
        <Text style={styles.ErrorMessage}>Error! Cannot get pokemons</Text>
      </View>
      <Image source={sleepingPikachuImage} style={styles.PikachuImage} />
      <View style={styles.Spacer} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  Spacer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ErrorMessageContainer: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ErrorMessage: {
    fontFamily: 'CircularStd-Black',
    fontSize: 20,
    color: '#F43E2A',
  },
  PikachuImage: {
    resizeMode: 'contain',
    width: '100%',
  },
});

export default ErrorScreen;
