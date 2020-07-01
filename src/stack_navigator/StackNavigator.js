import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PokedexScreen from '../pokedex/screens/PokedexScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Pokedex" component={PokedexScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default StackNavigator;
