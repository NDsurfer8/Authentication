import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import * as authAction from '../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';


const formSchema = yup.object({
    fullName: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})

const RegistrationScreen = ({ navigation }) => {
    const dispatch = useDispatch();


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    password: ''
                }}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    console.log(values)
                    dispatch(authAction.registerUser(values))
                        .then(async (result) => {
                            if (result.success) {
                                try {
                                    await AsyncStorage.setItem('token', result.token)
                                    navigation.navigate('TabNavigator')
                                }catch(err){
                                    console.log(err)
                                }
                            
                        } else {
                                Alert.alert('Registration failed. Try again')
                            }

                        })
                        .catch(err => console.log(err))

                }}
            >
                {(props) => (
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image style={styles.image} source={require('../assets/images/Langiddy_Logo.png')} />
                        </View>
                        <View>
                            <TextInput
                                autoCapitalize='none'
                                style={styles.input}
                                placeholder="Full Name"
                                placeholderTextColor={'#fff'}
                                keyboardType='email-address'
                                onChangeText={props.handleChange('fullName')}
                                value={props.values.fullName}
                                onBlur={props.handleBlur('fullName')}
                            />
                            <Text style={styles.error}>{props.touched.fullName && props.errors.fullName}</Text>
                            <TextInput
                                autoCapitalize='none'
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor={'#fff'}
                                keyboardType='email-address'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                onBlur={props.handleBlur('email')}
                            />
                            <Text style={styles.error}>{props.touched.email && props.errors.email}</Text>
                            <TextInput
                                autoCapitalize='none'
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor={'#fff'}
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                onBlur={props.handleBlur('password')}
                            />
                            <Text style={styles.error}>{props.touched.password && props.errors.password}</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}
                                    onPress={props.handleSubmit}
                                >Register</Text>
                            </TouchableOpacity>
                            <View style={styles.registerContainer}>
                                <Text style={styles.registerText}>Already have account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.registerButton}>  Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    )
}

export default RegistrationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    logo: {
        alignItems: 'center',
        marginBottom: 4,
    },
    image: {
        width: 400,
        height: 220,
        marginBottom: 80
    },
    input: {
        width: 300,
        backgroundColor: '#B6BFC4',
        borderRadius: 25,
        padding: 16,
        fontSize: 16,
        marginVertical: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#738289',
        marginVertical: 10,
        paddingVertical: 13,
        borderRadius: 25
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    registerContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    registerText: {
        color: '#738289',
        fontSize: 16
    },
    registerButton: {
        color: '#738289',
        fontSiz: 16,
        fontWeight: 'bold'
    },
    error: {
        color: 'red'
    }
})