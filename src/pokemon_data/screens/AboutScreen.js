import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {ScrollView} from 'react-native-gesture-handler';
import {usePokemonIdState} from '../../shared/components/PokemonIdProvider';
import useFetch from 'use-http';
import Snackbar from 'react-native-snackbar';

const AboutScreen = (props) => {
  let attempts = useRef(0);
  const pokemonId = usePokemonIdState();

  const {data = [], loading, get} = useFetch(
    pokemonId ? `/pokemon-species/${pokemonId}` : '',
    {
      onNewData: (currPokemon, newPokemon) => {
        if (newPokemon && newPokemon?.flavor_text_entries) {
          return {
            description: newPokemon?.flavor_text_entries?.find(
              (flavorTextItem) => flavorTextItem?.language?.name === 'en',
            ),
            genera: newPokemon?.genera?.find(
              (genusItem) => genusItem?.language?.name === 'en',
            ),
            growth_rate: newPokemon?.growth_rate?.name,
            habitat: newPokemon?.habitat?.name,
            shape: newPokemon?.shape?.name,
            eggGroups: newPokemon?.egg_groups?.map(
              (eggGroupsItem) => `${eggGroupsItem?.name}`,
            ),
          };
        } else if (currPokemon && currPokemon?.flavor_text_entries) {
          return {
            description: currPokemon?.flavor_text_entries?.find(
              (flavorTextItem) => flavorTextItem?.language?.name === 'en',
            ),
            genera: currPokemon?.genera?.find(
              (genusItem) => genusItem?.language?.name === 'en',
            ),
            growth_rate: currPokemon?.growth_rate?.name,
            habitat: currPokemon?.habitat?.name,
            shape: currPokemon?.shape?.name,
            eggGroups: currPokemon?.egg_groups?.map(
              (eggGroupsItem) => `${eggGroupsItem?.name}`,
            ),
          };
        }
        return [];
      },
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
        if (error?.name === '404') {
        } else {
          Snackbar.show({
            text:
              'Cannot fetch pokemon about information. Check your internet connection.',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#FB3737',
            action: {
              text: 'TRY AGAIN',
              textColor: 'white',
              onPress: () => get(),
            },
          });
        }
      }, // appends newly fetched todos
    },
    [pokemonId],
  );

  return (
    <ScrollView style={styles.mainContainer}>
      {pokemonId && data && data?.description && (
        <Grid style={styles.gridContainer}>
          <Row>
            <Col>
              <Text h4>Description: </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text>{`${data?.description?.flavor_text?.replace(
                /\\\w/g,
                '',
              )}`}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text h4 h4Style={styles.infoFont}>
                {'Genera: '}
              </Text>
            </Col>
            <Col size={2}>
              <Text style={styles.infoFont}>{data?.genera?.genus}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text h4 h4Style={styles.infoFont}>
                {'Growth rate: '}
              </Text>
            </Col>
            <Col size={2}>
              <Text style={styles.infoFont}>{data?.growth_rate}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text h4 h4Style={styles.infoFont}>
                {'Shape: '}
              </Text>
            </Col>
            <Col size={2}>
              <Text style={styles.infoFont}>{data?.shape}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text h4 h4Style={styles.infoFont}>
                {'Egg groups: '}
              </Text>
            </Col>
            <Col size={2}>
              <Text style={styles.infoFont}>{data?.eggGroups}</Text>
            </Col>
          </Row>
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

export default AboutScreen;
