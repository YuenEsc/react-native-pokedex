import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {ScrollView} from 'react-native-gesture-handler';
import {usePokemonIdState} from '../../shared/components/PokemonIdProvider';
import useFetch from 'use-http';
import {ProgressBar} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';

const BaseStatsScreen = (props) => {
  let attempts = useRef(0);
  const pokemonId = usePokemonIdState();

  const {data = [], loading, get} = useFetch(
    pokemonId ? `/pokemon/${pokemonId}` : '',
    {
      onNewData: (currPokemon, newPokemon) => {
        if (newPokemon && newPokemon?.stats) {
          return {
            hp: newPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'hp',
            )?.base_stat,
            attack: newPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'attack',
            )?.base_stat,
            defense: newPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'defense',
            )?.base_stat,
            special_attack: newPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'special-attack',
            )?.base_stat,
            special_defense: newPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'special-defense',
            )?.base_stat,
            speed: newPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'speed',
            )?.base_stat,
          };
        } else if (currPokemon && currPokemon?.stats) {
          return {
            hp: currPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'hp',
            )?.base_stat,
            attack: currPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'attack',
            )?.base_stat,
            defense: currPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'defense',
            )?.base_stat,
            special_attack: currPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'special-attack',
            )?.base_stat,
            special_defense: currPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'special-defense',
            )?.base_stat,
            speed: currPokemon?.stats?.find(
              (statItem) => statItem?.stat?.name === 'speed',
            )?.base_stat,
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
            'Cannot fetch base stats information. Check your internet connection.',
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
    <ScrollView style={styles.mainContainer}>
      {pokemonId && data && !loading && (
        <Grid style={styles.gridContainer}>
          <Row>
            <Col>
              <Text h4>Stats:</Text>
            </Col>
          </Row>
          <ListItem
            title="HP"
            subtitle={<ProgressBar progress={data?.hp / 255} />}
          />
          <ListItem
            title="Attack"
            subtitle={<ProgressBar progress={data?.attack / 190} />}
          />
          <ListItem
            title="Defense"
            subtitle={<ProgressBar progress={data?.defense / 250} />}
          />
          <ListItem
            title="Special attack"
            subtitle={<ProgressBar progress={data?.special_attack / 190} />}
          />
          <ListItem
            title="Special defense"
            subtitle={<ProgressBar progress={data?.special_defense / 250} />}
          />
          <ListItem
            title="Speed"
            subtitle={<ProgressBar progress={data?.speed / 180} />}
          />
        </Grid>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoFont: {
    fontSize: 16,
  },
  mainContainer: {
    backgroundColor: '#fff',
  },
  gridContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

export default BaseStatsScreen;
