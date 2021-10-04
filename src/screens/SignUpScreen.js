import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import MainButton from '../components/MainButton.js';
import PickPhotoButton from '../components/PickPhotoButton.js';
import { auth } from '../firebase/firebase.js';
import * as ImagePicker from 'expo-image-picker';
import { defaultPhotoURL } from '../constants/constants.js';
import colors from '../constants/colors.js';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [selectedImageURL, setSelectedImageURL] = React.useState(defaultPhotoURL);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImageURL(pickerResult.uri)
    }

    const navigation = useNavigation();

    const handleSignUp = async () => {
        try {
            const user = await auth.createUserWithEmailAndPassword(email, password);
            await auth.currentUser.updateProfile({ displayName, photoURL: selectedImageURL });

            if (user) {
                navigation.replace("Home");
            }

        }
        catch (error) {
            alert(error.message)
        }
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='height'
        >
            <View style={styles.inputContainer}>
                <TextInput
                    selectionColor='dodgerblue'
                    placeholder='Name'
                    style={styles.textInput}
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                />
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
                <PickPhotoButton
                    onPress={openImagePickerAsync}
                    buttonText='Pick A Photo'
                />
            </View>
            <View style={styles.buttonContainer}>
                <MainButton
                    onPress={handleSignUp}
                    buttonText='Register'
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen;

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
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
});