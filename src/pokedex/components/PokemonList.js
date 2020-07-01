import React, {useEffect} from 'react';
import {Text} from 'react-native-elements';
import useFetchAllPokemon from '../../shared/api/useFetchAllPokemon';
import {ActivityIndicator, View} from 'react-native';
import globalStyles from '../../shared/utils/globalStyles';
import {FlatList} from 'react-native';
import PokemonListCard from '../components/PokemonListCard';
const PokemonList = () => {
  const {
    loadInitialPokemon,
    loadMorePokemon,
    pokemon: pokemonListData,
    loading,
  } = useFetchAllPokemon();

  useEffect(() => {
    loadInitialPokemon();
  }, []);

  return (
    <View>
      {loading && pokemonListData && (
        <View style={globalStyles.CenteredLayoutContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {pokemonListData && (
        <FlatList
          keyExtractor={(item) => item.id}
          data={pokemonListData}
          renderItem={({item: pokemon}) => (
            <PokemonListCard pokemon={pokemon} />
          )}
          onEndReached={loadMorePokemon}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default PokemonList;
