import { StyleSheet, View, TextInput, Image } from 'react-native'
import React from 'react'

const InputText = (props) => {
    return (
        <View style={styles.container}>
            {props.startIcon && <Image source={props.startIcon}></Image>}
            <TextInput {...props} style={styles.inputText} />
            {props.endIcon && <Image source={props.endIcon}></Image>}
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#4E4B66',
        paddingHorizontal: 8
    },
    inputText: {
        marginLeft: 8,
        flex: 1
    }
})