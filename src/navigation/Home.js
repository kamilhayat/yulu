import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import DestinationResult from '../screens/DestinationResult'
import SearchResult from '../screens/SearchResult'
// import {User}  from 'firebase/auth'
import LoginScreen from '../components/Login/login'
const Stack = createStackNavigator();
// const InsideStack =createStackNavigator();
// function Insidehome(){
//     <InsideStack.Navigator>
//         <InsideStack.Screen name='home' component={HomeScreen}/>
//     </InsideStack.Navigator>
// }

const Home = (props) => {
    
    // const [user , setUser]  = useState<User |null>(null);
    return (
            <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}
            >
                <Stack.Screen name={"login"} component={LoginScreen}  />
                <Stack.Screen name={"home"} component={HomeScreen} />
                <Stack.Screen name={"DestinationResult"} component={DestinationResult} />
                <Stack.Screen name={"SearchResult"} component={SearchResult} />


            </Stack.Navigator>
    )
}


export default Home