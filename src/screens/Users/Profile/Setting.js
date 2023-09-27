import {
  StyleSheet, Text, View, Image,
  TouchableOpacity,
} from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../contexts/UserContext';
import arrowRight from '../../../assets/images/arrow_mini_icon.png'

const ItemMenu = ({ title, icon, onPress = () => { } }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.vbodyItem}>
        <View style={styles.vtitle}>
          <Image
            style={styles.itemMenuIcon}
            source={icon} />
          <Text style={styles.txtTitle}>{title}</Text>
        </View>
        <Image style={styles.arrowIcon} source={arrowRight} />
      </View>
    </TouchableOpacity>
  )
}


const Setting = (props) => {
  //user context
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  }

  const { navigation } = props;
  return (
    <View style={styles.container}>

      <View style={styles.vHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Image style={styles.iconBack} source={require('../../../assets/images/backpress.png')} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Settings</Text>
        <View />
      </View>

      <View style={styles.vbody}>
        <ItemMenu
          title="Notification"
          icon={require('../../../assets/images/notifi_icon2.png')}
          onPress={() => { }}
        />
        <ItemMenu
          title="Security"
          icon={require('../../../assets/images/security_Icon.png')}
          onPress={() => { }}
        />
        <ItemMenu
          title="Help"
          icon={require('../../../assets/images/help_Icon.png')}
          onPress={() => { }}
        />
        <View style={styles.vbodyItem}>
          <View style={styles.vtitle}>
            <Image style={styles.itemMenuIcon} source={require('../../../assets/images/darkmode_Icon.png')} />
            <Text style={styles.txtTitle}>Dark Mode</Text>
          </View>
          <Image style={styles.arrowIcon} source={require('../../../assets/images/Toggle.png')} />

        </View>
        <ItemMenu
          title="Logout"
          icon={require('../../../assets/images/logout_Icon.png')}
          onPress={handleLogout}
        />
      </View>

    </View>

  )
}

export default Setting

const styles = StyleSheet.create({
  txtTitle: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
  },
  txtHeader: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
  },
  itemMenuIcon: {
    marginRight: 10,
  },
  vtitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vbodyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#E5E5E5',
    marginBottom: 50,
    height: 24,
  },
  vbody: {
  },
  vHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    height: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
})