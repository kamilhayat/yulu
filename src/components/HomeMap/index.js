import React, { useState, useEffect } from 'react';

import { View, Text, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import cars from '../../../assets/data/cars'
const HomeMap = (props) => {
  

  const getImage = (type) => {
    if (type == 'yuludemo') {
      return require('../../../assets/yuludemo.png');
    }
    
  }
  return (

    <MapView
      style={{width: '100%', height: '125%'}}
      // provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 28.5466419,
        longitude: 77.3008128,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}
      >
        {cars.map((car) => (
        <Marker
          key={car.id}
          coordinate={{latitude: car.latitude, longitude: car.longitude}}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
              transform: [{
                rotate: `${car.heading}deg`
              }]
            }}
            source={getImage(car.type)}
          />
           </Marker>
         ))} 
    </MapView>


    )
}

export default HomeMap