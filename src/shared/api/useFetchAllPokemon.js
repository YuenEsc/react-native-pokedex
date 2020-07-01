import {useState} from 'react';
import useFetch from 'use-http';
import parseRawPokemonList from '../utils/parseRawPokemonList';
import Snackbar from 'react-native-snackbar';

function useFetchAllPokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState('/pokemon');

  const fetchAllPokemon = useFetch(nextUrl ? nextUrl : '/pokemon', {
    onError: () => {
      Snackbar.show({
        text: 'Error cannot get pokemons. Check your internet connection',
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: '#F43E2A',
        action: {
          text: 'CLOSE',
          textColor: 'white',
          onPress: () => {
            Snackbar.dismiss();
          },
        },
      });
    },
  });

  const {response, get, loading, error} = fetchAllPokemon;

  const loadInitialPokemon = async () => {
    const data = await get();
    if (response.ok) {
      const parsedPokemon = await parseRawPokemonList(data.results);
      setPokemon(parsedPokemon);
      setNextUrl(data.next);
    }
  };

  const loadMorePokemon = async () => {
    const data = await get();
    if (response.ok) {
      const parsedPokemon = await parseRawPokemonList(data.results);
      setPokemon([...pokemon, ...parsedPokemon]);
      setNextUrl(data.next);
    } else {
      Snackbar.show({
        text: 'Error cannot  more pokemons. Check your internet connection',
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: '#F43E2A',
        action: {
          text: 'CLOSE',
          textColor: 'white',
          onPress: () => {
            Snackbar.dismiss();
          },
        },
      });
    }
  };

  return {
    fetchAllPokemon,
    loadInitialPokemon,
    loadMorePokemon,
    pokemon,
    loading,
    error,
  };
}

export default useFetchAllPokemon;
