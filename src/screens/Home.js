import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MainButton from '../components/MainButton';
import { auth } from '../firebase/firebase';

const Home = ({ navigation }) => {

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate('Login');
            })
            .catch(error => alert(error.message));
    }


    return (
        <View style={styles.container}>
            <Image
                source={{ uri: auth.currentUser.photoURL }}
                style={styles.avatar}
            />
            <Text>Username: {auth.currentUser.displayName}</Text>
            <Text>Email: {auth.currentUser.email}</Text>
            <View style={styles.buttonContainer}>
                <MainButton
                    onPress={handleSignOut}
                    buttonText='Sign Out'
                    outline
                />
            </View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 30,
        borderRadius: 20,
    },
    buttonContainer: {
        width: '80%',
        marginTop: 100
    }
})
