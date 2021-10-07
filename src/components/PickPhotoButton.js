import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const MainButton = ({ onPress, buttonText }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.photoButton}
        >
            <Text style={styles.buttonText}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    photoButton: {
        backgroundColor: colors.photoBtnColor,
        width: '60%',
        padding: 8,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: '700'
    }
});
