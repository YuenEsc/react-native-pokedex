import React, {useEffect, useState, useCallback} from 'react';
import {Text} from 'react-native-elements';
import useFetchAllPokemon from '../../shared/api/useFetchAllPokemon';
import {
  ActivityIndicator,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import globalStyles from '../../shared/utils/globalStyles';
import {FlatList} from 'react-native';
import PokemonListCard from '../components/PokemonListCard';
import ListFooterLoading from './ListFooterLoading';
import ErrorScreen from '../../shared/screens/ErrorScreen';

const PokemonList = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    loadInitialPokemon,
    loadMorePokemon,
    pokemon: pokemonListData,
    error,
    loading,
  } = useFetchAllPokemon();

  useEffect(() => {
    loadInitialPokemon();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadInitialPokemon().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.MainContainer}>
      {!error && loading && !pokemonListData && (
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing && loading}
              onRefresh={onRefresh}
            />
          }
          ListFooterComponent={
            loading && !error ? <ListFooterLoading /> : <React.Fragment />
          }
        />
      )}
      {error && pokemonListData.length === 0 && <ErrorScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#ffffff',
  },
});

export default PokemonList;
