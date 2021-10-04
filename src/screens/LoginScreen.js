import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, View, Text } from 'react-native';
import MainButton from '../components/MainButton';
import { auth } from '../firebase/firebase';
import colors from '../constants/colors.js';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message))
    }

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, [])

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='height'
        >
            <Text style={styles.header}>
                Welcome!
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    selectionColor='dodgerblue'
                    placeholder='Email'
                    style={styles.textInput}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    selectionColor='dodgerblue'
                    placeholder='Password'
                    style={styles.textInput}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <MainButton
                    onPress={handleLogin}
                    buttonText='Login'
                />
                <MainButton
                    onPress={() => navigation.replace('SignUp')}
                    buttonText='Register'
                    outline
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBgColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 40,
        color: colors.mainColor,
    },
    inputContainer: {
        width: '80%',
    },
    textInput: {
        marginVertical: 10,
        padding: 10,
        borderColor: colors.mainColor,
        borderRadius: 5,
        backgroundColor: colors.inverseColor,
        borderWidth: 1
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
});