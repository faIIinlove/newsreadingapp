import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import DatePicker from 'react-native-date-picker';

const ModalDatePicker = ({ controlModal, onDateSelected = () => { } }) => {

    const [isShowModal, setIsShowModal] = controlModal
    const [date, setDate] = useState(new Date())

    const closeModal = useCallback(() => {
        setIsShowModal(false)
    }, [])

    const handleSave = () => {
        onDateSelected(date)
        setIsShowModal(false)
    }


    return (
        <Modal animationType="fade" transparent={true} visible={isShowModal} onRequestClose={closeModal}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Chọn ngày</Text>
                        <View style={styles.datePickerContainer}>
                            <DatePicker
                                date={date}
                                mode="date"
                                format="DD/MM/YYYY"
                                onDateChange={setDate}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={closeModal} style={styles.button}>
                                <Text style={styles.buttonLabel}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: '#1877F2' }]}>
                                <Text style={[styles.buttonLabel, { color: '#fff' }]}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalDatePicker

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 6,
        padding: 16
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16
    },
    datePickerContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        padding: 8,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 10,
        alignItems: 'center',
        width: '48%'
    },
    buttonLabel: {
        fontWeight: 'bold'
    }

})