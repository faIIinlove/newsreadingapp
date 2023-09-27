import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import { uploadImage } from '../services/NewsService'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Lottie from 'lottie-react-native';
import uploadAnimation from '../assets/lottie/animedancing.json'


const RenderUploading = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Lottie style={{ height: 100 }} source={uploadAnimation} autoPlay loop />
        </View>
    )
}

const ModalUploadImage = ({ controlModal, onImageSelected = (e) => {} , onUploaded = (e) => {}}) => {
    const [isUploading, setIsUploading] = useState(false)
    const [isShowModal, setIsShowModal] = controlModal
    const handleAddImage = useCallback(async () => {
        await launchImageLibrary({
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        }, handleImage)
    })

    const handleTakePhoto = useCallback(async () => {
        await launchCamera({
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        }, handleImage)
    }, [])

    const handleImage = useCallback(async (data) => {
        if (data.assets) {
            onImageSelected(data.assets[0].uri)
            const { uri, type, fileName: name } = data.assets[0];
            const formData = new FormData();
            formData.append('image', { uri, name, type })
            setIsUploading(true)
            const { data: resUpload } = await uploadImage(formData)
            setIsUploading(false)
            onUploaded(resUpload.path)
        }
        setIsShowModal(false)
    }, [])

    const closeModal = useCallback(() => {
        if (isUploading) return;
        setIsShowModal(false)
    }, [])

    return (
        <Modal animationType="fade" transparent={true} visible={isShowModal} onRequestClose={closeModal}>
            <Pressable onPress={closeModal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={styles.container}>
                    {isUploading ? <RenderUploading /> :
                        (<View>
                            <TouchableOpacity onPress={handleAddImage} style={styles.button} >
                                <Image style={styles.buttonIcon} source={require('../assets/images/image-gallery.png')}></Image>
                                <Text style={styles.buttonLabel}>Pick from gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleTakePhoto} style={[styles.button, { marginTop: 10 }]} >
                                <Image style={styles.buttonIcon} source={require('../assets/images/photo-camera.png')}></Image>
                                <Text style={styles.buttonLabel}>Take a photo</Text>
                            </TouchableOpacity>
                        </View>)}
                </View>
            </Pressable>
        </Modal >
    )
}

export default ModalUploadImage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 6,
        padding: 16
    },
    button: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonIcon: {
        width: 24,
        height: 24,
        margin: 8
    }
    ,
    buttonLabel: {
        fontWeight: 'bold'
    }



})