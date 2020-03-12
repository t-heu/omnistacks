import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { ScrollView, SafeAreaView, AsyncStorage, Image, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import SpotList from '../components/SpotList'
import logo from '../assets/logo.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.15.2:3333', {
        query: { user_id }  
      })

      socket.on('booking_response', booking => {
        setTimeout(() => { 
          Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
        }, 500)
      })
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim())

      setTechs(techsArray)
    })
  }, [])

  function handleLogout() {
    AsyncStorage.clear()
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnV} />
        <Image style={styles.logo} source={logo} />
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
     </View>
        
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  btnV: {
    width: 70,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },

  button: {
    marginTop: 4,
    height: 30,
    width: 70,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
