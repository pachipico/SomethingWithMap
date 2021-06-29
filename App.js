/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';
import {KEY} from './key';

const App: () => Node = () => {
  const [location, setLocation] = useState({
    latitude: 37.2900534,
    longitude: 127.1117606,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const addMarkers = data => {
    console.log(data);
    getPlace(data.latitude, data.longitude);
  };
  const getPlace = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${KEY}&input=starbucks&inputtype=textquery&radius100${latitude},${longitude}`;
    const placeData = await axios.get(url);
    const placeDetails = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${KEY}&place_id=${placeData.data.candidates[0].place_id}`,
    );
    console.log(placeDetails);
  };
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        onPress={e => {
          addMarkers(e.nativeEvent.coordinate);
        }}
        onRegionChange={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onRegionChangeComplete={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        rotateEnabled={false}
        loadingEnabled={true}
        initialRegion={{
          latitude: 37.2900534,
          longitude: 127.1117606,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}></MapView>
    </View>
  );
};

export default App;
