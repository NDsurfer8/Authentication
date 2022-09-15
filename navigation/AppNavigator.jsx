import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PhraseBookScreen from "../screens/PhraseBookScreen";
import MessagesScreen from "../screens/MessagesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditProfileScreen from '../screens/EditProfileScreen'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




function TabNavigator (){
    return(
    <Tab.Navigator initialRouteName="Messages" >
        <Tab.Screen name='Dashboard' component={HomeScreen} />
        <Tab.Screen name='PhraseBook' component={PhraseBookScreen} />
        <Tab.Screen name='Messages' component={MessagesScreen} />
        <Tab.Screen name='Settings' component={SettingsScreen} />
        <Tab.Screen name='Edit' component={EditProfileScreen} />
    </Tab.Navigator>
    )
}



function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name='Login' 
                    component={LoginScreen} 
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='Registration'
                    component={RegistrationScreen} 
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='TabNavigator' 
                    component={TabNavigator}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;