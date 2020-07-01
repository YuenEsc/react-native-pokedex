const capitalizeString = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1);

const getPokemonIdFromUrl = (url) => url.split('/')[6];

export {capitalizeString, getPokemonIdFromUrl};
