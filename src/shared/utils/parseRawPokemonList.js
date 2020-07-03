import {capitalizeString, getPokemonIdFromUrl} from './stringOperations';
import getPokemonColor from './getPokemonColor';

const getTypesByPokemonId = async (pokemonId) => {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((result) => result.json())
    .then((data) =>
      data.types.map((typeItem) => `${typeItem.type.name.toUpperCase()}`),
    );
};

const parseRawPokemonList = async (rawPokemons) => {
  return Promise.all(
    rawPokemons.map(async (p, i) => {
      const pokemonId = getPokemonIdFromUrl(p.url);
      const name = capitalizeString(p.name);
      const types = await getTypesByPokemonId(pokemonId);
      const color = getPokemonColor(types[0]);
      return {
        id: pokemonId,
        name,
        color: color,
        url: p.url,
        image: `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`,
        types: types,
      };
    }),
  );
};

export default parseRawPokemonList;
