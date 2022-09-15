import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const Settings = () => {

    const [image, setImage] = useState('');

    const openImageLibrary = async () => {
        const { status } = await ImagePicker.
            requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work')
        }
        if (status === 'granted') {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            });
            if (!response.cancelled) {
                setImage(response.uri)
            }
        }
    }

    const uploadImage = () => {
        langApi.post('/')


    }

    return (
        <View style={styles.container}>

            <View>
                <TouchableOpacity onPress={openImageLibrary} style={styles.uploadBtnContainer}>
                    {
                        image ? <Image source={{ uri: image }} style={{ width: '100%', height: '200%' }} />
                            : <Text style={styles.uploadBtn}>Upload Profile Image</Text>
                    }
                </TouchableOpacity>

                <Text style={styles.skip}>Skip</Text>
                {image ? (
                    <Text
                        onPress={uploadImage}
                        style={[styles.skip, { backgroundColor: 'skyblue', height: 30 }]}>Upload</Text>) : null


                }
            </View>

        </View>
    )
}




export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadBtnContainer: {
        height: 225,
        width: 225,
        borderRadius: 125 / 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    uploadBtn: {
        textAlign: 'center',
        fontSize: 16,
        opacity: 0.3,
        fontWeight: 'bold'
    },
    skip: {
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        opacity: 0.3
    }
})