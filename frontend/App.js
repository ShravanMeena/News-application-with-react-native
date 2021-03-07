import * as React from 'react';
import {Text, View, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'localstorage-polyfill';

// screens
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import FavouriteScreen from './src/screens/FavouriteScreen';
import SettingScreen from './src/screens/SettingScreen';
import SearchScreen from './src/screens/SearchScreen';

import NewsDetailScreen from './src/screens/NewsDetailScreen';
import CommentScreen from './src/screens/CommentScreen';
import MoreNews from './src/screens/MoreNews';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'cog' : 'cog';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Category') {
            iconName = focused ? 'table' : 'table';
          } else if (route.name === 'Saved') {
            iconName = focused ? 'bookmark-o' : 'bookmark-o';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#E56924',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Saved" component={FavouriteScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        })}
        mode="modal">
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />

        <Stack.Screen
          name="Comments"
          component={CommentScreen}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />

        <Stack.Screen name="MoreNews" component={MoreNews} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
