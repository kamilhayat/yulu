import { View, Text, StyleSheet, ActivityIndicator, Button, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../../firebase';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';

// import  Root from '../../navigation/Root'

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);

  const auth = FIREBASE_AUTH

  const signIn = async () => {
    navigation.navigate('home');

    setloading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      // Display a success alert for successful login
      Alert.alert('Success', 'Login successful');
    } catch (error) {
      console.log(error);
      // Display an error alert for failed login
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    } finally {
      setloading(false);
    }
  }

  const signUp = async () => { // Accept navigation as a parameter

    setloading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      // Display a success alert for successful registration
      Alert.alert('Success', 'Registration successful');
    } catch (error) {
      console.log(error);
      // Display an error alert for failed registration
      Alert.alert('Error', 'Registration failed. Please try again later.');
    } finally {
      setloading(false);
    }
  }



  return (
    <View style={styles.container}>
      {/* <KeyboardAvoidingView behavior="padding"> */}



      <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>

      
      {loading ? <ActivityIndicator size='large' color='#0000ff' />
        : <>
          <View style={styles.button}>

            <Button title='Login' onPress={signIn} />
          </View>
          <Button title=' create account Signup Here' onPress={signUp} />
        </>}
      {/* </KeyboardAvoidingView> */}
      {/* <Root /> */}

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#f0f0f0',

  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 25,
    padding: 8,
    borderRadius: 4,
  },
  button: {
    // padding: 20,
    marginBottom: 20,

  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

