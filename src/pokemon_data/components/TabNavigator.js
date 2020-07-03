import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AboutScreen from '../screens/AboutScreen';
import BaseStatsScreen from '../screens/BaseStatsScreen';
import EvolutionScreen from '../screens/EvolutionScreen';
import MovesScreen from '../screens/MovesScreen';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="About"
        tabBarOptions={{
          style: {
            elevation: 0,
            color: '#fff',
          },
          indicatorStyle: {
            width: '11%',
            marginLeft: '5%',
            height: 3,
            borderRadius: 2,
          },
          labelStyle: {
            fontFamily: 'CircularStd-Bold',
            fontSize: 12,
          },
          lazy: true,
        }}>
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Moves" component={MovesScreen} />
        <Tab.Screen name="Base stats" component={BaseStatsScreen} />
        <Tab.Screen name="Evolution" component={EvolutionScreen} />
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default TabNavigator;