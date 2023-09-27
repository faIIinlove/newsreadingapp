import { StyleSheet, View, TextInput, Image, Pressable } from 'react-native'
import React, {useState} from 'react'

import iconShowPassword from '../assets/images/eye.jpg';
import iconHidePassword from '../assets/images/eye2.png';

const InputPassword = (props) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
        <View style={styles.container}>
            {props.startIcon && <Image source={props.startIcon}></Image>}
            <TextInput {...props} secureTextEntry={!isShowPassword} style={styles.inputText} placeholder={props.placeholder} />
            <Pressable onPress={() => setIsShowPassword(!isShowPassword)}>
                <Image source={
                    isShowPassword ? iconShowPassword :  iconHidePassword
                }></Image>
            </Pressable>
        </View>
    )
}

export default InputPassword

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