import {useState} from 'react';
import useFetch from 'use-http';
import parseRawPokemonList from '../utils/parseRawPokemonList';

function useFetchAllPokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState('/pokemon');

  const fetchAllPokemon = useFetch(nextUrl ? nextUrl : '/pokemon');

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
