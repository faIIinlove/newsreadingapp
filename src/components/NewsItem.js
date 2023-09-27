import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'

import icon_clock from '../assets/images/logoTime.png'
import more3Dot from '../assets/images/3dot_Icon.png'

const Latest = ({ thumb, title, avatar, author, time, onPress = function () { } }) => {
    const parseTime = (timeString) => {
        const parsedTime = moment(timeString);
        return parsedTime.fromNow();
    }

    return (
        <TouchableOpacity onPress={onPress} style={myStyle.container}>
            <Image style={myStyle.thumbnail} source={thumb} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <Text style={myStyle.fontNationality}>Europe</Text>
                <Text numberOfLines={2} style={myStyle.fontTitleTrending}>{title}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{ flexDirection: 'row' }} >
                        {!!avatar?.uri && <Image style={myStyle.authorAvatar} source={avatar} />}
                        <Text style={myStyle.authorName}>{author ?? ''}</Text>
                        <Image style={myStyle.logoTime} source={icon_clock} />
                        <Text style={myStyle.fontTime}>{parseTime(time)}</Text>
                    </View>
                    <Image style={myStyle.dotIcon} source={more3Dot} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Latest

const myStyle = StyleSheet.create({
    authorAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
    }
    ,
    thumbnail: {
        width: 96,
        height: 96,
        borderColor: '#C4C4C4',
        borderRadius: 6,
        backgroundColor: '#C4C4C4',
        marginRight: 4,
    },
    container: {
        marginBottom: 16,
        flexDirection: 'row',
        // width:'100%',
    },
    dotIcon: {
        // height:1.75,
        marginTop: 3,
        marginRight: 1.75,
        // backgroundColor:'red',
    },

    fontTime: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 20,
        letterSpacing: 0.12,
        color: '#4E4B66',
        marginLeft: 5.17,
        // backgroundColor:'red'
    },

    logoTime: {
        marginTop: 4.17,
    },

    authorName: {
        fontWeight: '600',
        fontSize: 13,
        color: '#4E4B66',
        marginLeft: 4,
        marginRight: 13.17,
        // backgroundColor:'red'
    },
    fontTitleTrending: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#000000',
        paddingBottom: 4,
        // backgroundColor:'red'
    },

    fontNationality: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 20,
        letterSpacing: 0.12,
        color: '#4E4B66',
        paddingBottom: 4,
        // backgroundColor:'red'
    },

    imageforTrending: {
        width: '100%',
        height: 183,
        borderWidth: 1,
        borderColor: '#4E4B66',
        borderRadius: 6,
        backgroundColor: '#C4C4C4',
        marginBottom: 8,
    },
})