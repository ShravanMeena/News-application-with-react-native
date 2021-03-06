import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import FavouriteScreen from './src/screens/FavouriteScreen';

const Tab = createBottomTabNavigator();

class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <Text>Settings</Text>
      </View>
    );
  }
}

class QuizScreen extends Component {
  render() {
    return (
      <View>
        <Text>QuizScreen</Text>
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Category') {
                iconName = focused ? 'arrows-alt' : 'arrows-alt';
              } else if (route.name === 'Quiz') {
                iconName = focused ? 'table' : 'table';
              } else if (route.name === 'Favourite') {
                iconName = focused ? 'heart' : 'heart';
              } else if (route.name === 'Accounts') {
                iconName = focused ? 'user' : 'user';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
          initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Category" component={CategoryScreen} />
          <Tab.Screen name="Favourite" component={FavouriteScreen} />
          <Tab.Screen name="Quiz" component={QuizScreen} />

          <Tab.Screen name="Accounts" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
