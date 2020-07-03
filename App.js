import React from 'react';
import StackNavigator from './src/stack_navigator/StackNavigator';
import {Provider} from 'use-http';
import {PokemonColorProvider} from './src/shared/components/PokemonColorProvider';
import {PokemonIdProvider} from './src/shared/components/PokemonIdProvider';

const App = () => {
  return (
    <Provider url="https://pokeapi.co/api/v2">
      <PokemonColorProvider>
        <PokemonIdProvider>
          <StackNavigator />
        </PokemonIdProvider>
      </PokemonColorProvider>
    </Provider>
  );
};

export default App;
