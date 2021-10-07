import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const MainButton = ({ onPress, buttonText, outline }) => {

    const buttonStyle = outline ? [styles.submitButton, styles.submitButtonOutline] : styles.submitButton;
    const buttonTextStyle = outline ? [styles.buttonText, styles.buttonTextOutline] : styles.buttonText;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={buttonStyle}
        >
            <Text style={buttonTextStyle}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: colors.mainColor,
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButtonOutline: {
        backgroundColor: 'transparent',
        borderColor: colors.mainColor,
        borderWidth: 2
    },
    buttonText: {
        color: colors.inverseColor,
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: '700'
    },
    buttonTextOutline: {
        color: colors.mainColor
    }
});
