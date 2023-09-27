import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const DefaultIcon = () => {
    return <View style={{ width: 24, height: 24 }} />
}

const TopAppBar = ({ leftIcon, onPressLeftIcon, title, rightIcon, onPressRightIcon }) => {
    return (
        <View style={styles.container}>
            {leftIcon ? (
                <TouchableOpacity onPress={onPressLeftIcon}>
                    <Image source={leftIcon} style={{ width: 16, height: 16 }} />
                </TouchableOpacity>
            ) : <DefaultIcon />}
            <Text style={{ color: '#000' }}>{title}</Text>
            {rightIcon ? (
                <TouchableOpacity onPress={onPressRightIcon}>
                    <Image source={rightIcon} style={{ width: 16, height: 16 }} />
                </TouchableOpacity>
            ) : <DefaultIcon />}
        </View>
    )
}

export default TopAppBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})