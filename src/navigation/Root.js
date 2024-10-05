import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, Text } from 'react-native'
import Home from './Home'
import CustomDrawer from './CustomDrawer'
import LoginScreen from '../components/Login/login'

const Drawer = createDrawerNavigator();
const DummyScreen = (props) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{props.name}</Text>
    </View>
)

const Root = (props) => {
    return (
        <Drawer.Navigator drawerContent={
            (props) => (
                <CustomDrawer {...props} />)
        }>
            <Drawer.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Drawer.Screen name="Your Tips">
                {() => <DummyScreen name={"Your Tips"} />}
            </Drawer.Screen>
            {/* <Drawer.Screen name="Login" component={LoginScreen}>
            </Drawer.Screen> */}

            <Drawer.Screen name="Help">
                {() => <DummyScreen name={"Help"} />}
            </Drawer.Screen>

            <Drawer.Screen name="Wallet">
                {() => <DummyScreen name={"Wallet"} />}
            </Drawer.Screen>

            <Drawer.Screen name="Settings">
                {() => <DummyScreen name={"Settings"} />}
            </Drawer.Screen>
        </Drawer.Navigator>

    )
}

export default Root