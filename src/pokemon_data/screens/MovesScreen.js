import React, {useRef} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {usePokemonIdState} from '../../shared/components/PokemonIdProvider';
import useFetch from 'use-http';
import Snackbar from 'react-native-snackbar';

const MovesScreen = (props) => {
  let attempts = useRef(0);
  const pokemonId = usePokemonIdState();

  const {data = [], loading, get} = useFetch(
    `/pokemon/${pokemonId}`,
    {
      onNewData: (currPokemon, newPokemon) => {
        if (newPokemon && newPokemon?.moves) {
          return {
            moves: newPokemon?.moves.map((moveItem) => ({
              name: `${moveItem?.move?.name}`,
            })),
          };
        } else if (currPokemon && currPokemon?.moves) {
          return {
            moves: currPokemon.moves.map((moveItem) => ({
              name: `${moveItem?.move?.name}`,
            })),
          };
        }
      }, // appends newly fetched todos
      retries: 0,
      // retryOn: [305]
      retryOn({attempt, error: retryError, response}) {
        attempts.current = attempt + 1;
        console.log('(retryOn) attempt', attempt);
        console.log('(retryOn) error', retryError);
        console.log('(retryOn) response', response);
        return response && response.status >= 300;
      },
      // retryDelay: 3000,
      retryDelay({attempt, error: retryDelayError, response}) {
        console.log('(retryDelay) attempt', attempt);
        console.log('(retryDelay) error', retryDelayError);
        console.log('(retryDelay) response (delay)', response);
        return 1000 * (attempt + 1);
      },
      onError(error) {
        console.log(JSON.stringify(error));
        Snackbar.show({
          text:
            'Cannot fetch pokemon moves information. Check your internet connection.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#FB3737',
          action: {
            text: 'TRY AGAIN',
            textColor: 'white',
            onPress: () => get(),
          },
        });
      },
    },
    [pokemonId],
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      {pokemonId && data && data?.moves && !loading && (
        <FlatList
          keyExtractor={(item, i) => item?.name}
          data={data.moves}
          renderItem={({item}) => <ListItem title={item?.name} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoFont: {
    fontSize: 16,
  },
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  gridContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

export default MovesScreen;
