import {capitalizeString} from './stringOperations';
import getPokemonColor from './getPokemonColor';

const parseRawPokemon = async (rawPokemon) => {
  const name = capitalizeString(rawPokemon.name);
  const types = rawPokemon.types.map(
    (typeItem) => `${typeItem.type.name.toUpperCase()}`,
  );
  const color = getPokemonColor(types[0]);
  return {
    id: rawPokemon.id,
    name,
    color: color,
    types: types,
  };
};

export default parseRawPokemon;
