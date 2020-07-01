import Colors from './colors';

const getPokemonColor = (typeOfPokemon) => {
  let color;
  switch (typeOfPokemon.toLowerCase()) {
    case 'grass':
      color = Colors.lightGreen;
      break;

    case 'bug':
      color = Colors.lightTeal;
      break;

    case 'fire':
      color = Colors.lightRed;
      break;

    case 'water':
      color = Colors.lightBlue;
      break;

    case 'fighting':
      color = Colors.red;
      break;

    case 'normal':
      color = Colors.beige;
      break;

    case 'electric':
      color = Colors.lightYellow;
      break;

    case 'psychic':
      color = Colors.lightPink;
      break;

    case 'poison':
      color = Colors.lightPurple;
      break;

    case 'ghost':
      color = Colors.purple;
      break;

    case 'ground':
      color = Colors.darkBrown;
      break;

    case 'rock':
      color = Colors.lightBrown;
      break;

    case 'dark':
      color = Colors.black;
      break;

    case 'dragon':
      color = Colors.violet;
      break;

    case 'fairy':
      color = Colors.pink;
      break;

    case 'flying':
      color = Colors.lilac;
      break;

    case 'ice':
      color = Colors.lightCyan;
      break;

    case 'steel':
      color = Colors.grey;
      break;

    default:
      color = Colors.lightBlue;
      break;
  }
  return color;
};

export default getPokemonColor;
