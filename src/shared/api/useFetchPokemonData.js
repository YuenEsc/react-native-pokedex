import {useState} from 'react';
import useFetch from 'use-http';
import parseRawPokemon from '../utils/parseRawPokemon';
import Snackbar from 'react-native-snackbar';
import {usePokemonIdState} from '../components/PokemonIdProvider';

function useFetchPokemonData() {
  const [pokemonData, setPokemonData] = useState([]);
  const pokemonId = usePokemonIdState();

  const fetchPokemonData = useFetch(`/pokemon/${pokemonId}`, {
    onError: () => {
      Snackbar.show({
        text: 'Error cannot get pokemon. Check your internet connection',
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

  const {response, get, loading, error} = fetchPokemonData;

  const loadPokemonData = async () => {
    const data = await get();
    if (response.ok) {
      const parsedPokemon = await parseRawPokemon(data);
      setPokemonData(parsedPokemon);
    }
  };

  return {
    fetchPokemonData,
    loadPokemonData,
    pokemonData,
    loading,
    error,
  };
}

export default useFetchPokemonData;
