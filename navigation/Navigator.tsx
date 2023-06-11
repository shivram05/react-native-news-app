
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import NewsOverView from '../screens/NewsOverView';
import Saved from '../screens/Saved';

function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Saved' component={Saved}/>
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen 
        options={{headerShown:false}}
        name="HomeScreen" component={HomeScreen} />
        <Stack.Screen  name="NewsOverview" component={NewsOverView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;