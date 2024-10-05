import React from "react";
import { Image } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const OrderMap = ({ car }) => {

    const getImage = (type) => {
        return require('../../../assets/yuludemo.png');
    
    
      }

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 28.549320118503083,
        longitude: 77.29648932833949,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}>

      {car && (<Marker
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
      </Marker>)}
    </MapView>
  );
};

export default OrderMap;