import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { View, Text, StyleSheet } from 'react-native'

import Main from './pages/Main'
import Profile from './pages/Profile'

import Header from './components/Header'

const Stack = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: () => (<Header />)
      //title: 'DevRadar'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Perfil no Github'
    }
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: '#7d40e7',
      //height: 54
    }
  }
})

const Routes = createSwitchNavigator({
  Stack
})

export default createAppContainer(Routes)
