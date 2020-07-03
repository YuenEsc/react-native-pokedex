import React, {useEffect, useState, useCallback, useRef} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {usePokemonIdState} from '../../shared/components/PokemonIdProvider';
import useFetch from 'use-http';
import Snackbar from 'react-native-snackbar';

const fetchEvolutionChainUrl = async (pokemonId) => {
  if (pokemonId !== undefined) {
    return await fetch(
      pokemonId
        ? `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
        : '',
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data.evolution_chain.url;
      });
  }
};

const parseEvolutionChain = (chain) => {
  let evoChain = [];
  let evoData = chain;
  do {
    let numberOfEvolutions = evoData['evolves_to'].length;
    evoChain.push({
      species_name: evoData?.species?.name,
      image: evoData?.species.url.split('/')[6]
        ? `https://pokeres.bastionbot.org/images/pokemon/${
            evoData?.species.url.split('/')[6]
          }.png`
        : undefined,
      id: evoData?.species.url.split('/')[6],
      min_level: evoData?.min_level ? evoData?.min_level : 0,
      trigger_name: evoData?.trigger?.name,
      item: evoData?.item,
    });
    if (numberOfEvolutions > 0) {
      for (let i = 0; i < numberOfEvolutions; i++) {
        evoChain.push({
          species_name: evoData?.evolves_to[i]?.species.name,
          id: evoData?.evolves_to[i]?.species?.url.split('/')[6],
          image: evoData?.evolves_to[i]?.species?.url.split('/')[6]
            ? `https://pokeres.bastionbot.org/images/pokemon/${
                evoData?.evolves_to[i]?.species?.url?.split('/')[6]
              }.png`
            : undefined,
          min_level: evoData?.evolves_to[i]?.evolution_details[0]?.min_level,
          trigger_name: evoData.evolves_to[i]?.trigger?.name,
          item: evoData?.evolves_to[i]?.item,
        });
      }
    }
    evoData = evoData['evolves_to'][0];
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
  evoChain = evoChain?.reduce(function (result, value, index, array) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);
  return evoChain;
};

const EvolutionScreen = (props) => {
  let attempts = useRef(0);
  const pokemonId = usePokemonIdState();
  const [evolutionChainUrl, setEvolutionChainUrl] = useState('');

  const changeEvolutionChainUrl = useCallback(async () => {
    const url = await fetchEvolutionChainUrl(pokemonId);
    console.log(url);
    setEvolutionChainUrl(url);
  }, [pokemonId]);

  useEffect(() => {
    changeEvolutionChainUrl();
  }, [changeEvolutionChainUrl]);

  const {data = [], loading, get} = useFetch(
    evolutionChainUrl,
    {
      onNewData: (currPokemon, newPokemon) => {
        if (newPokemon && newPokemon?.chain) {
          const evolutions = parseEvolutionChain(newPokemon.chain);
          return evolutions;
        } else if (currPokemon && currPokemon?.chain) {
          const evolutions = parseEvolutionChain(currPokemon.chain);
          return evolutions;
        }
        return [];
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
            'Cannot fetch pokemon evolution information. Check your internet connection.',
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
    [evolutionChainUrl],
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      {pokemonId && data && !loading && (
        <FlatList
          keyExtractor={(item, i) => item?.name}
          data={data}
          renderItem={({item}) => {
            if (item?.length === 2) {
              return (
                <ListItem
                  leftAvatar={{source: {uri: item[0]?.image}}}
                  title={'Evolves to'}
                  rightAvatar={{source: {uri: item[1]?.image}}}
                  subtitle={`At level ${item[1]?.min_level}`}
                />
              );
            } else {
              return <React.Fragment />;
            }
          }}
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

export default EvolutionScreen;
