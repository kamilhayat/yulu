import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Router from './src/navigation/Root.js'
import { NavigationContainer } from '@react-navigation/native';




const App = () => {


  return (
    <>
      <StatusBar barStyle="dark-content" />
    <NavigationContainer>
      <Router />
      {/* <Root /> */}
    </NavigationContainer>
     
    </>
  );
};
export default App;