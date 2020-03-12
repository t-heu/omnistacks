import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.text}>
      DevRadar
    </Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#7d4de7',
    height: 54,
    //paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4
    },
    elevation: 2
  },
  text: {
    color: '#fff',
    fontSize: 19
  }
})

export default Header