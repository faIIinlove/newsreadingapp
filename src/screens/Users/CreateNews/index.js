import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { createNews } from '../../../services/NewsService'
import ModalUploadImage from '../../../components/ModalUploadImage'
import TopAppBar from '../../../components/TopAppBar'

const ButtonFormat = ({ src }) => {
    return (
        <TouchableOpacity style={{ margin: 8 }}>
            <Image source={src} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
    )
}


const CreateNews = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [thumbUrl, setThumbUrl] = useState(null)
    const [publishClicked, setPublishClicked] = useState(false)
    const [canPublish, setCanPublish] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)

    useEffect(() => {
        if (publishClicked) {
            (async function () {
                const res = await createNews(title, content, thumbUrl);
                if (res?.statusCode === 200) {
                    console.log(res.data)
                    resetForm();
                }
            })()
        }
    }, [publishClicked])

    useEffect(() => {
        setCanPublish(title.length > 5 && content.length > 10)
    }, [title, content])

    const handlePublish = useCallback(() => {
        setPublishClicked(true)
    })

    const handleImageSelected = useCallback((uri) => {
        setImage(uri)
    }, [])

    const handleUploaded = useCallback((url) => {
        setThumbUrl(url)
        console.log('thumbUrl: ', url)
    }, [])


    const resetForm = () => {
        setTitle('');
        setContent('');
        setImage(null);
        setPublishClicked(false);
    };


    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.container}>
                <TopAppBar title='Create News'
                    onPressLeftIcon={() => { props.navigation.goBack() }}
                    leftIcon={require('../../../assets/icon/arrow_left.png')} />
                <TouchableOpacity style={styles.btnAddImage} onPress={() => setIsShowModal(!isShowModal)} >
                    {image ? (
                        <Image style={{ width: '100%', height: '100%', borderRadius: 6 }} source={{ uri: image }} />
                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <Image style={{ width: 24, height: 24 }} source={require('../../../assets/images/plus.png')} />
                            <Text style={{ marginTop: 8 }}>Add Cover Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <ModalUploadImage controlModal={[isShowModal, setIsShowModal]} onImageSelected={handleImageSelected} onUploaded={handleUploaded} />
                <TextInput multiline
                    onChangeText={(text) => setTitle(text)}
                    placeholder='News title' style={styles.inputTitle} value={title} />
                <TextInput multiline
                    onChangeText={(text) => setContent(text)}
                    placeholder='Add News/Article' style={styles.inputContent} value={content} />
                <View style={styles.formatBar}>
                    <ButtonFormat src={require('../../../assets/images/bold.png')} />
                    <ButtonFormat src={require('../../../assets/images/italic.png')} />
                    <ButtonFormat src={require('../../../assets/images/list_order.png')} />
                    <ButtonFormat src={require('../../../assets/images/list_unorder.png')} />
                    <ButtonFormat src={require('../../../assets/images/link.png')} />
                </View>
            </View>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 0.5 }}>
                <View style={styles.toolBar}>
                    <ButtonFormat src={require('../../../assets/images/font_size.png')} />
                    <ButtonFormat src={require('../../../assets/images/align_left.png')} />
                    <ButtonFormat src={require('../../../assets/images/add_image.png')} />
                    <ButtonFormat src={require('../../../assets/images/more.png')} />
                </View>
                <TouchableOpacity disabled={!canPublish} onPress={handlePublish} style={[{ margin: 14, borderRadius: 6, paddingHorizontal: 10 }, canPublish ? styles.btnEnabled : styles.btnDisabled]}>
                    <Text style={[{ margin: 14, fontWeight: '600' }, canPublish && { color: '#fff' }]}>Publish</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateNews

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        paddingHorizontal: 24,
        backgroundColor: 'white',
        flex: 1,
    },
    inputTitle: {
        marginVertical: 8,
        fontSize: 24,
        color: '#050505',
        borderBottomWidth: 1.5,
        borderBottomColor: '#A0A3BD',
    },
    inputContent: {
        marginVertical: 8,
        color: '#4E4B66'
    },
    btnAddImage: {
        marginVertical: 8,
        borderRadius: 6,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEF1F3',
        borderWidth: 1.5,
        borderColor: '#4E4B66',
        borderStyle: 'dashed',
    },
    formatBar: {
        position: 'absolute',
        left: 24,
        bottom: 8,
        paddingHorizontal: 8,
        borderRadius: 6,
        flexDirection: 'row',
        backgroundColor: 'white',
        flex: 0,
        elevation: 5,
    },
    toolBar: {
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    btnEnabled: {
        backgroundColor: '#1877F2',
        color: '#fff',
    },
    btnDisabled: {
        backgroundColor: '#EEF1F4',
        color: '#667080',
    }
})