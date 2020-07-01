import React from 'react';
import {ImageBackground, View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';

const pokeballImage = require('../../../assets/images/pokeball.png');

const PokemonListCard = ({pokemon}) => {
  return (
    <View style={[styles.MainContainer, {backgroundColor: pokemon.color}]}>
      <ImageBackground
        resizeMode="contain"
        source={pokeballImage}
        style={styles.Pokeball}
        imageStyle={styles.PokeballImage}>
        <View style={styles.Overlay}>
          <Text style={styles.PokemonName}>{pokemon.name}</Text>
          <Image source={{uri: pokemon.image}} style={styles.Pokemon} />
          <View style={styles.PokemonTypeContainer}>
            <Text style={styles.PokemonType}>{pokemon.types[0]}</Text>
          </View>
          {pokemon.types.length === 2 && (
            <View style={[styles.PokemonTypeContainer, styles.TopMargin]}>
              <Text style={[styles.PokemonType]}>{pokemon.types[1]}</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    minHeight: 120,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 16,
  },
  PokemonName: {
    fontFamily: 'CircularStd-Bold',
    color: '#fff',
  },
  Pokeball: {
    flex: 1,
    top: 25,
    left: 50,
  },
  Overlay: {
    flex: 1,
    position: 'relative',
    top: -25,
    left: -50,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  PokeballImage: {
    opacity: 0.14,
    tintColor: '#ffffff',
    resizeMode: 'contain',
    marginHorizontal: 30,
  },
  Pokemon: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: 6,
    bottom: 6,
  },
  PokemonType: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontFamily: 'CircularStd-Book',
    color: '#fff',
    fontSize: 8,
    opacity: 1,
  },
  PokemonTypeContainer: {
    backgroundColor: '#ffffff28',
    minWidth: 40,
    maxWidth: 50,
    borderRadius: 8,
  },
  TopMargin: {
    marginTop: 4,
  },
});

export default PokemonListCard;
