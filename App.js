import React from 'react';
import StackNavigator from './src/stack_navigator/StackNavigator';
import {Provider} from 'use-http';

const App = () => {
  return (
    <Provider url="https://pokeapi.co/api/v2">
      <StackNavigator />
    </Provider>
  );
};

export default App;
