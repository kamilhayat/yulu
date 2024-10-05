import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import styles from './styles'
import Ionicons from "react-native-vector-icons/Ionicons";

const BikeTypeRow = ({ type, onPress, isSelected, price, distance }) => {

  const calculateTiming = (distance) => {
    // console.log('Distance:', distance); // Log distance to check its value
    // Assuming an average speed of 10 km/h for calculation
    const averageSpeed = 10; // in km/h
    const estimatedTime = distance / averageSpeed; // in hours
    // Convert estimated time to minutes for display
    const minutes = Math.round(estimatedTime * 60);
    console.log('Minutes:', minutes); // Log calculated minutes
    return minutes;
  };
  const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
  };

  const getImage = (props) => {

    return require('../../../assets/yuludemo.png');


  }
  const currentTime = new Date();
  // Calculate estimated time to reach destination
  const estimatedTimeToReachDestination = calculateTiming(distance);
  // Add estimated time to current time
  currentTime.setMinutes(currentTime.getMinutes() + estimatedTimeToReachDestination);
  // Format the result for display
  const formattedTime = `${formatTime(currentTime.getHours())}:${formatTime(currentTime.getMinutes())}`;
  return (


    <Pressable
      onPress={onPress}
      style={[styles.container, {
        backgroundColor: isSelected ? '#efefef' : 'white',
      }]}
    >

      {/*  Image */}
      <Image
        style={styles.image}
        source={getImage()}
      />

      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {type.type}{' '}
          <Ionicons name={'person'} size={16} />
          1
        </Text>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.time}>
              drop off at {formattedTime}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.time}>
              {calculateTiming(distance)} mins to reach
            </Text>
          </View>
        </View>

      </View>
      <View style={styles.rightContainer}>
        <Ionicons name={'pricetag'} size={18} color={'#42d742'} />
        <Text style={styles.price}>est. ₹{price}</Text>
      </View>
    </Pressable>

  )
}

export default BikeTypeRow