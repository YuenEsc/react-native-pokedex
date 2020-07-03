import React, {useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {
  PokemonColorProvider,
  usePokemonColorState,
} from '../../shared/components/PokemonColorProvider';
import {
  PokemonIdProvider,
  usePokemonIdState,
} from '../../shared/components/PokemonIdProvider';
import PokemonCarousel from '../components/PokemonCarousel';
import {Text} from 'react-native-elements';
import useFetchPokemonData from '../../shared/api/useFetchPokemonData';
import TabNavigator from '../components/TabNavigator';

const pokeballImage = require('../../../assets/images/pokeball.png');
const dotsImage = require('../../../assets/images/dotted.png');
const screenHeight = Dimensions.get('screen').height;

const PokemonDataScreen = () => {
  const pokemonId = usePokemonIdState();
  const pokemonColor = usePokemonColorState();

  const {loadPokemonData, pokemonData, error, loading} = useFetchPokemonData();

  useEffect(() => {
    loadPokemonData();
  }, [pokemonId]);

  const spin = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      {
        iterations: -1,
      },
    ).start();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '359deg'],
  });

  const backgroundColor = pokemonData?.color
    ? pokemonData.color
    : backgroundColor;

  return (
    <SafeAreaView style={styles.MainContainer}>
      <Animated.View
        style={[
          styles.BackgroundContainer,
          {backgroundColor: backgroundColor},
        ]}>
        <View style={styles.CenterContainer}>
          <Animated.Image
            resizeMode="contain"
            source={pokeballImage}
            style={[
              styles.Pokeball,
              {
                transform: [
                  {
                    rotate: rotate,
                  },
                ],
              },
            ]}
          />
          <Text style={styles.PokemonName}>{pokemonData?.name}</Text>
          <View style={styles.PokemonTypesRow}>
            {pokemonData &&
              pokemonData?.types?.length &&
              pokemonData?.types[0] && (
                <View style={styles.PokemonTypeContainer}>
                  <Text style={styles.PokemonType}>
                    {pokemonData?.types[0]}
                  </Text>
                </View>
              )}
            {pokemonData &&
              pokemonData?.types?.length == 2 &&
              pokemonData?.types[1] && (
                <View style={styles.PokemonTypeContainer}>
                  <Text style={styles.PokemonType}>
                    {pokemonData?.types[1]}
                  </Text>
                </View>
              )}
          </View>
          {pokemonData && pokemonData?.id && (
            <View style={styles.NumberContainer}>
              <Text style={styles.Number}>
                #{pokemonData?.id?.toString()?.padStart(3, '0')}
              </Text>
            </View>
          )}
        </View>
        <PokemonCarousel />
        <View style={[styles.BackdropContainer]}>
          <TabNavigator />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  PokemonName: {
    fontFamily: 'CircularStd-Black',
    fontSize: 40,
    marginLeft: 20,
    position: 'relative',
    top: -380,
    textAlign: 'left',
    color: '#ffffff',
    alignSelf: 'flex-start',
  },
  PokemonTypesRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    top: -375,
  },
  NumberContainer: {
    alignSelf: 'flex-end',
    top: -450,
    paddingRight: 20,
  },
  Number: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'CircularStd-Black',
  },
  PokemonTypeContainer: {
    position: 'relative',
    marginLeft: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ffffff42',
    borderRadius: 12,
    textAlign: 'left',
    color: '#ffffff',
  },
  PokemonType: {
    fontFamily: 'CircularStd-Black',
    fontSize: 15,
    position: 'relative',
    color: '#ffffff',
  },
  BackgroundContainer: {
    zIndex: 0,
    flex: 1,
  },
  Pokeball: {
    position: 'relative',
    top: 220,
    width: 220,
    resizeMode: 'center',
    tintColor: '#FFFFFF24',
  },
  PokeballImage: {
    opacity: 0.14,
    tintColor: '#ffffff',
    resizeMode: 'contain',
    marginHorizontal: 80,
  },
  CenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackdropContainer: {
    backgroundColor: '#ffffff',
    zIndex: 1,
    minHeight: screenHeight / 2,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
  },
});

export default PokemonDataScreen;
