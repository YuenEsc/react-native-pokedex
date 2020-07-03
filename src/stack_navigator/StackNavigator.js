import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PokedexScreen from '../pokedex/screens/PokedexScreen';
import {NavigationContainer} from '@react-navigation/native';
import PokemonDataScreen from '../pokemon_data/screens/PokemonDataScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Pokedex" component={PokedexScreen} />
      <Stack.Screen name="PokemonData" component={PokemonDataScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default StackNavigator;
