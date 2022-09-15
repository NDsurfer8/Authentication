import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = (props) => {
    const loadProfile = async () => {
        const token = await AsyncStorage.getItem('token')
        // protects screen 
        if(!token){
            props.navigation.navigate('Login')
        }
        console.log(token)
    }

    useEffect(()=>{
        loadProfile()
    })


    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen
const styles = StyleSheet.create({

})