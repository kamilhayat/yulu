import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native'

const HomeSearch = (props) => {
    const navigation = useNavigation();
  const goToSearch = () => {
    navigation.navigate('DestinationResult')
  }

  // const homePlace = {
  //   description: 'Home',
  //   geometry: { latitude: 28.549320118503083, longitude: 77.29641422649048 }
  // };

  // const workPlace = {
  //   description: 'Work',
  //   geometry: { latitude: 28.515553194119487, longitude: 77.25055416881817 }
  // };
  return (

    <View style={styles.container}>
      {/*  Input Box */}
      <Pressable onPress={goToSearch} style={styles.inputBox}>

        {/* <Pressable onPress={goToSearch} style={styles.inputBox}> */}
        <Text style={styles.inputText}>Where To?</Text>

        <View style={styles.timeContainer}>
          <AntDesign name={'clockcircle'} size={16} color={'#535353'} />
          <Text>Now</Text>
          <MaterialIcons name={'keyboard-arrow-down'} size={16} />
        </View>
      </Pressable>
      {/* </Pressable> */}

      {/* Previous destination */}
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <AntDesign name={'clockcircle'} size={20} color={'#ffffff'} />
        </View>
        <Text style={styles.destinationText}>Work</Text>
      </View>

      {/* Home destination */}
      <View style={styles.row}>
        <View style={[styles.iconContainer, { backgroundColor: '#218cff' }]}>
          <Entypo name={'home'} size={20} color={'#ffffff'} />
        </View>
        <Text style={styles.destinationText}>Home</Text>
      </View>
    </View>
  )
}

export default HomeSearch