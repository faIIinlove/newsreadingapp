import {
  StyleSheet, Text,
  TextInput, View, Image, TouchableHighlight, Dimensions, TouchableOpacity,
  KeyboardAvoidingView, ScrollView,
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { updateInfomation } from '../../../services/UserService';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Snackbar from 'react-native-snackbar';
import { UserContext } from '../../../contexts/UserContext';
import ModalUploadImage from '../../../components/ModalUploadImage';
import ModalDatePicker from '../../../components/ModalDatePicker';

const EditProfile = (props) => {
  const { user: currentUser, setUser } = useContext(UserContext);

  const [isShowModal, setIsShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (isSaveClicked) {
      (async function () {
        setIsLoading(true);
        const res = await updateInfomation({ avatar, name: fullName, email, phone: phoneNumber, address, dob: dateOfBirth });
        if (res?.statusCode === 200) {
          setUser(res.data);
          Snackbar.show({
            text: 'Cập nhật thông tin thành công!',
            duration: Snackbar.LENGTH_LONG
          });
        }
        setIsLoading(false);
        setIsSaveClicked(false);
      })()

    }
  }, [isSaveClicked])

  const handleSave = () => {
    setIsSaveClicked(true);
  }

  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [fullName, setFullName] = useState(currentUser.name ?? '');
  const [email, setEmail] = useState(currentUser.email ?? '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phone ?? '');
  const [address, setAddress] = useState(currentUser.address ?? '');
  const [dateOfBirth, setDateOfBirth] = useState(currentUser.dob ?? new Date().toISOString);

  const { navigation } = props;
  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.vHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={styles.iconBack}
                source={require('../../../assets/images/tick_x_Icon.png')} />
            </TouchableOpacity>
            <Text style={styles.txtHeader}>Edit Profile</Text>
            <TouchableHighlight
              onPress={handleSave}>
              <Image
                style={styles.iconBack}
                source={require('../../../assets/images/tick_v_Icon.png')} />
            </TouchableHighlight>
          </View>

          <View style={styles.avatarContainer}>
            <Image
              style={styles.imgAvatar}
              source={{ uri: avatar }} />
            <TouchableHighlight style={styles.iconEditAvatar} onPress={() => setIsShowModal(!isShowModal)}>
              <Image source={require('../../../assets/images/Frame.png')} />
            </TouchableHighlight>
          </View>
          <ModalUploadImage controlModal={[isShowModal, setIsShowModal]} onUploaded={setAvatar} />

          <View style={styles.vbody}>
            <View style={styles.vbodyItem}>
              <Text style={styles.txtTitle}>Full Name</Text>
              <TextInput
                value={fullName}
                onChangeText={(text) => setFullName(text)}
                style={styles.txtInput}
                placeholder="Enter your Full Name "
                placeholderTextColor="grey"
                keyboardType="default"
              />
            </View>

            <View style={styles.vbodyItem}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.txtTitle}>Email Address</Text>
                <Text style={[styles.txtTitle, { color: '#C30052' }]}>*</Text>
              </View>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.txtInput}
                placeholder="Enter your Email Address*"
                placeholderTextColor="grey"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.vbodyItem}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.txtTitle}>Phone Number</Text>
                <Text style={[styles.txtTitle, { color: '#C30052' }]}>*</Text>
              </View>
              <TextInput
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                style={styles.txtInput}
                placeholder="Enter your Phone Number*" placeholderTextColor="grey" keyboardType="phone-pad"
              />
            </View>

            <View style={styles.vbodyItem}>
              <Text style={styles.txtTitle}>Address</Text>
              <TextInput
                value={address}
                onChangeText={(text) => setAddress(text)}
                style={styles.txtInput}
                placeholder="Enter your Address" placeholderTextColor="grey" keyboardType="default"
              />
            </View>

            <View style={styles.vbodyItem}>
              <Text style={styles.txtTitle}>Date of Birth</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ width: '100%', alignItems: 'center' }}>
                <Text style={styles.txtInput}>{dateOfBirth}</Text>
              </TouchableOpacity>
              <ModalDatePicker controlModal={[showDatePicker, setShowDatePicker]} onDateSelected={(d) => setDateOfBirth(d.toISOString())} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 14,
    color: '#4E4B66',
    marginBottom: 4,
  },
  txtInput: {
    width: '100%',
    borderColor: '#4E4B66',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    color: '#050505',
  },
  vbodyItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconEditAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    backgroundColor: '#C4C4C4',
    bottom: 0,
    right: Dimensions.get('window').width / 2 - 80,
  },
  imgAvatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#C4C4C4',
  },
  avatarContainer: {
    width: '100%',
    height: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  txtHeader: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
  },
  vHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
})