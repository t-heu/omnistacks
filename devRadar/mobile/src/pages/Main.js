import React, { useState, useEffect } from 'react';
import { TextInput, Dimensions, Text, View, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync,  getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'
import { connect, disconnect, subscribeToNewDev } from '../services/socket'
import styles from './styles'

let dim = Math.round(Dimensions.get('window').height)

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null)
  const [devs, setDevs] = useState([])
  const [techs, setTechs] = useState('')
  const [keyboardHeight, setKeyboardHeight] = useState(20)
  
  Keyboard.addListener('keyboardDidShow', (e) => {
    //setKeyboardHeight(20)
    setKeyboardHeight(dim - e.endCoordinates.height )
  })
  
  Keyboard.addListener('keyboardDidHide', (e) => {
    setKeyboardHeight(20)
  })
  
  useEffect(() => {
    subscribeToNewDev(dev => setDevs([...devs, dev]))
  },[devs])
  
  useEffect(() => {
    async function loadInitial() {
      const { granted } = await requestPermissionsAsync()
        
      if(granted) {
        const { coords } = await getCurrentPositionAsync({
            enableHighAccuracy: true
          })
          
        const {latitude, longitude} = coords
        
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }
    loadInitial()
  },[])

  function setupWebsocket() {
    disconnect()

    const { latitude, longitude } = currentRegion
    
    connect(
      latitude,
      longitude,
      techs
    )
  }

  async function loadDevs() {
    try {
      const { latitude, longitude } = currentRegion
      
      const response = await api.get('/search', {
        params: {
          latitude,
          longitude,
          techs
        }
      })
      
      setDevs(response.data)
      setupWebsocket()
    } catch(err) {
      alert('erro')
    }
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region)
  }

  if(!currentRegion) {
    return null
  }
  
  return (
    <>
      <MapView 
        onPress={() => Keyboard.dismiss()}
        onRegionChangeComplete={handleRegionChanged} 
        initialRegion={currentRegion} 
        style={styles.map}
      >
        {devs.map(dev => (
          <Marker 
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1], 
              longitude: dev.location.coordinates[0]
            }}
          >
            <Image 
              style={styles.avatar} 
              source={{uri: dev.avatar_url }} 
            />
            <Callout onPress={() => {
              navigation.navigate('Profile', {github_username: dev.github_username})
            }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devTechs} style={styles.devBio}>{dev.bio}</Text>
                <Text>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      
      <View style={[styles.searchForm, {bottom: keyboardHeight}]}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          blurOnSubmit={false}
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}
