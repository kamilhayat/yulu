  import React, { useEffect, useState } from "react";
  import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
  import { ActivityIndicator, StyleSheet, View } from 'react-native';


  const RouteMap = ({ origin, destination }) => {
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [originMarker, setOriginMarker] = useState(null);
    const [destinationMarker, setDestinationMarker] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
      if (origin && destination) {
        console.log('Origin Coordinates:', origin);
        console.log('Destination Coordinates:', destination);
        fetchRoute();
      }
    }, [origin, destination]);

    const fetchRoute = async () => {
      try {
        setIsLoading(true);
        setError(null);


        const apiKey = 'pk.1e7d05bd54091e3fa470945698290b45';
        const originEncoded = encodeURIComponent(`${origin.longitude},${origin.latitude}`);
        const destinationEncoded = encodeURIComponent(`${destination.longitude},${destination.latitude}`);
        const url = `https://us1.locationiq.com/v1/directions/driving/${originEncoded};${destinationEncoded}?key=${apiKey}&steps=true&alternatives=true&geometries=polyline&overview=full`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch route');
        }
        const data = await response.json();
        console.log('API Response:', data);
        if (data.routes && data.routes.length > 0 && data.routes[0].geometry) {
          const coordinates = decodePolyline(data.routes[0].geometry);
          setRouteCoordinates(coordinates);
          setOriginMarker(origin);
          setDestinationMarker(destination);
        } else {
          throw new Error('No valid route found in API response');
        }
      } catch (error) {
        console.error('Error fetching route:', error);
        setError(error.message);

      } finally {
        setIsLoading(false);
      }
    };







    const parseRouteCoordinates = (data) => {
      if (data && data.routes && data.routes.length > 0 && data.routes[0].geometry) {
        return decodePolyline(data.routes[0].geometry);
      } else {
        console.error('No valid route geometry found in API response');
        return [];
      }
    };

    const decodePolyline = (encoded) => {
      let poly = [];
      let index = 0;
      let lat = 0;
      let lng = 0;

      try {
        while (index < encoded.length) {
          let b;
          let shift = 0;
          let result = 0;
          do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
          let dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
          lat += dlat;

          shift = 0;
          result = 0;
          do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
          let dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
          lng += dlng;

          let point = { latitude: lat / 1e5, longitude: lng / 1e5 };
          poly.push(point);
        }
      } catch (error) {
        console.error('Error decoding polyline:', error);
      }
      return poly;
    };




    console.log('Route Coordinates:', routeCoordinates);
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.container}>
          <Text>Error: {error}</Text>
        </View>
      );
    }
  
    return (
      <MapView 



        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 28.549320118503083,
          longitude: 77.29648932833949,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >

        {originMarker && <Marker coordinate={originMarker} title="Origin" />}
        {destinationMarker && <Marker coordinate={destinationMarker} title="Destination" />}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={5}
            strokeColor='blue'
          />
        )}
      </MapView>
    );
  };


  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      width: '100%', // You can use percentage values for responsive sizing
      height: '150%'

    },
  };

  export default RouteMap;
