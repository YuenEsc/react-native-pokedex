import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {usePokemonIdState, useSetPokemonId} from '../../shared/components/PokemonIdProvider';
import Carousel from 'react-native-snap-carousel';
import {Text} from 'react-native-elements';

const {width: screenWidth} = Dimensions.get('window');
const marginWidth = 200;

const PokemonCarousel = (props) => {
  const carouselRef = useRef(null);
  const [pokemonImages, setPokemonImages] = useState();
  const setPokemonId = useSetPokemonId();
  const pokemonId = usePokemonIdState();

  useEffect(() => {
    setPokemonImages(Array.from(Array(746).keys(), (k) => k));
  }, []);

  const renderItem = ({item}) => {
    let itemStyle;
    if (item == pokemonId) {
      itemStyle = styles.Pokemon;
    } else {
      itemStyle = styles.ShadowPokemon;
    }
    return (
      <Image
        source={{
          uri: `https://pokeres.bastionbot.org/images/pokemon/${item}.png`,
        }}
        style={itemStyle}
      />
    );
  };

  return (
    <View style={styles.Container}>
      <Carousel
        ref={carouselRef}
        inactiveSlideOpacity={0.8}
        inactiveSlideScale={0.85}
        firstItem={pokemonId}
        initialNumToRender={3}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - marginWidth}
        data={pokemonImages}
        renderItem={renderItem}
        initialScrollIndex={pokemonId}
        onSnapToItem={index => {
          setPokemonId(index);
        }}
        getItemLayout={(data, index) => {
          return {
            length: screenWidth - marginWidth,
            offset: (screenWidth - marginWidth) * index,
            index: index,
          };
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 3,
    top: 10,
  },
  Pokemon: {
    backgroundColor: 'transparent',
    width: screenWidth - marginWidth,
    height: screenWidth - marginWidth,
  },
  ShadowPokemon: {
    backgroundColor: 'transparent',
    width: screenWidth - marginWidth,
    height: screenWidth - marginWidth,
    tintColor: '#00000042',
  },
});

export default PokemonCarousel;
