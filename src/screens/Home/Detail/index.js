import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import moment from 'moment'
import { getNewsById, shareNews } from '../../../services/NewsService';
import Snackbar from 'react-native-snackbar';
import Lottie from 'lottie-react-native';

import loadingAnimation from '../../../assets/lottie/animedancing.json'

const parseTime = (timeString) => {
    const parsedTime = moment(timeString);
    return parsedTime.fromNow();
}


const Detail = (props) => {
    const { navigation, route } = props;
    const { id, createdBy } = route.params;

    const [loading, setLoading] = useState(false);
    const [thumbUrl, setThumbUrl] = useState('https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg');
    const [avatarAuthor, setAvatarAuthor] = useState('https://img.icons8.com/ios-filled/50/user-male-circle.png');
    const [nameAuthor, setNameAuthor] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    useEffect(() => {
        (async function () {
            setLoading(true);
            const res = await getNewsById(id);
            if (res?.statusCode === 200) {
                const { createdAt, title, content, image } = res.data[0];
                !!image && setThumbUrl(image);
                !!createdBy?.avatar && setAvatarAuthor(createdBy.avatar);
                setNameAuthor(createdBy?.name ?? 'Anonymous');
                setPublishTime(createdAt);
                setTitle(title);
                setContent(content);
            }
            setLoading(false);
        })()
    }, [])

    const handleShare = useCallback(async () => {
        await shareNews({
            message: title,
            title: title
        }, () => {
            Snackbar.show({
                text: 'Cập nhật thông tin thành công!',
                duration: Snackbar.LENGTH_LONG
            });
        })
    }, [])



    return (
        <View style={detailStyles.body}>
            <View style={detailStyles.toolbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={detailStyles.backIcon} source={require('../../../assets/icon/arrow_left.png')} />
                </TouchableOpacity>
                <View style={detailStyles.shareContainer}>
                    <TouchableOpacity onPress={handleShare}>
                        <Image style={{ height: 24, width: 24 }} source={require('../../../assets/icon/sharesocial.png')} />
                    </TouchableOpacity>
                    <Image style={{ height: 24, width: 24 }} source={require('../../../assets/icon/more.png')} />
                </View>
            </View>
            {loading ? <Lottie source={loadingAnimation} autoPlay loop /> : (<View>
                <View style={detailStyles.followContainer}>
                    <View style={detailStyles.authorInfoContainer}>
                        <Image style={detailStyles.authorAvatar} source={{ uri: avatarAuthor }}></Image>
                        <View style={detailStyles.followTitle}>
                            <Text style={detailStyles.authorName}>{nameAuthor}</Text>
                            <Text style={detailStyles.publishTime}>{parseTime(publishTime)}</Text>
                        </View>
                    </View>
                    <Pressable style={detailStyles.buttonFollowing}>
                        <Text style={detailStyles.buttonFollowingLabel}>Following</Text>
                    </Pressable>
                </View >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image style={detailStyles.imgDetail} source={{ uri: thumbUrl }}></Image>
                    <View style={detailStyles.titleContainer}>
                        <Text style={detailStyles.titleEurope}>Europe</Text>
                        <Text style={detailStyles.titleUkraine}>{title}</Text>
                    </View>
                    <Text style={detailStyles.content}>{content}</Text>
                    <View style={detailStyles.bottomContainer}>
                        <View style={detailStyles.likeContainer}>
                            <View style={detailStyles.like}>
                                <Image style={detailStyles.backIcon} source={require('../../../assets/icon/favorite.png')}></Image>
                                <Text style={detailStyles.likeNumber}>24.5k</Text>
                            </View>
                            <View style={detailStyles.like}>
                                <Image style={detailStyles.backIcon} source={require('../../../assets/icon/comment.png')}></Image>
                                <Text style={detailStyles.likeNumber}>1k</Text>
                            </View>
                        </View>
                        <View style={detailStyles.like}>
                            <Image style={detailStyles.backIcon} source={require('../../../assets/icon/bookmark.png')}></Image>
                        </View>
                    </View>
                </ScrollView>
            </View>)}
        </View>
    )
}

export default Detail

const detailStyles = StyleSheet.create({
    content: {
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#4E4B66'
    },
    likeNumber: {
        marginLeft: 5,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#050505'
    },
    like: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,

    },
    titleUkraine: {
        fontWeight: '400',
        lineHeight: 36,
        fontSize: 24,
        letterSpacing: 0.12,
        color: '#000000'
    },
    titleEurope: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.12,
        color: '#4E4B66'
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    imgDetail: {
        marginTop: 20,
        height: 250,
        borderRadius: 6
    },
    buttonFollowingLabel: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#FFFFFF'
    },
    buttonFollowing: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 24,
        height: 34,
        backgroundColor: '#1877F2',
        borderRadius: 6,
    },
    publishTime: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.12,
        color: '#4E4B66'
    },
    authorName: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#000000'
    },
    followTitle: {
        marginLeft: 10,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    authorInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    authorAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    followContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    shareIcon: {
        marginRight: 10,
        width: 24,
        height: 24
    },
    shareContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    backIcon: {
        width: 16,
        height: 16
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    body: {
        padding: 24,
        backgroundColor: 'white',
        flex: 1
    },
})