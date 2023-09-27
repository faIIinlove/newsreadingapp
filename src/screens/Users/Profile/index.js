import {
  Image, Pressable,
  StyleSheet, Text, View, TouchableHighlight, Dimensions, TouchableOpacity, FlatList,
  KeyboardAvoidingView
} from 'react-native'

import React, { useEffect, useState, useContext } from 'react'
import { getMyNews } from '../../../services/NewsService';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserContext } from '../../../contexts/UserContext';

import Latest from '../../../components/NewsItem';
import Lottie from 'lottie-react-native';
import loadingNewsAnimation from '../../../assets/lottie/animedancing.json'

const Tab = createMaterialTopTabNavigator();

const ThongKe = ({ title, subTitle }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontWeight: '600', color: '#000', }}>{title}</Text>
      <Text style={{ color: '#4E4B66', }}>{subTitle}</Text>
    </View>
  )
}

const renderItem = ({ item }, navigation) => {


  return (
      <Latest
        onPress={() => navigation.navigate('Home', {
          screen: 'Detail',
          params: { id: item._id, createdBy: item.createdBy }
        })}
        thumb={{ uri: item.image }}
        title={item.title}
        avatar={{ uri: item.createdBy.avatar }}
        author={item.createdBy.name}
        time={item.createdAt}
      />
  )
}
const Profile = (props) => {
  const { user: currentUser } = useContext(UserContext);
  const { navigation } = props;
  const [newList, setNewList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyListNews = async () => {
    setLoading(true);
    const res = await getMyNews();
    if (res?.statusCode === 200) {
      const createdBy = { name: currentUser.name, avatar: currentUser.avatar }
      setNewList(res.data.map(
        (item) => {
          return { ...item, createdBy }
        }
      ));
    }
    setLoading(false);
  }
  useEffect(() => {
    getMyListNews();
  }, [])

  const MyNewList = (props) => {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        {loading ? <Lottie source={loadingNewsAnimation} autoPlay loop /> :
          (<FlatList
            style={{ backgroundColor: '#fff' }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            onRefresh={getMyListNews}
            data={newList}
            renderItem={(item) => renderItem(item, props.navigation)}
            keyExtractor={(item, index) => item._id}
          />)
        }
      </View>
    )
  }

  return (
      <View style={styles.container}>
        <View style={styles.vTitle}>
          <Text style={{ width: 24 }}></Text>
          <Text style={styles.txtProfile}>Profile</Text>
          <TouchableHighlight
            underlayColor={'rgba(0, 0, 0, 0)'}
            onPress={() => navigation.navigate('Setting')}>
            <Image
              style={styles.settingIcon}
              source={require('../../../assets/images/settingIcon.png')} />
          </TouchableHighlight>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: currentUser.avatar }} />
          <ThongKe title='2156' subTitle='Followers' />
          <ThongKe title='567' subTitle='Following' />
          <ThongKe title='23' subTitle='News' />
        </View>
        <View style={styles.infomationContainer}>
          <Text style={styles.txtName}>{currentUser.name}</Text>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </Text>
        </View>
        <View style={styles.vBtn}>
          <Pressable
            style={styles.btnEdit}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.txtBtnEdit}>Edit profile</Text>
          </Pressable>
          <Pressable
            style={styles.btnEdit}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.txtBtnEdit}>Website</Text>
          </Pressable>
        </View>
        <View style={styles.newsContainer}>
          <Tab.Navigator
            screenOptions={{
              tabBarPressColor: '#FFFFFF',
              tabBarLabelStyle: {
                fontWeight: '400',
                fontSize: 16,
                color: '#000000',
              },
              tabBarItemStyle: {
                width: 100,
              },
              tabBarContentContainerStyle: {
                justifyContent: 'center',
              },
              tabBarIndicatorStyle: {
                backgroundColor: '#1877F2',
                height: 4,
                left: 125,
              },
            }}
          >
            <Tab.Screen name="News" component={MyNewList} />
          </Tab.Navigator>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('CreateNews')} style={{
          position: 'absolute',
          right: 24,
          bottom: 24,
          width: 54,
          height: 54,
          borderRadius: 27,
          elevation: 5,
          backgroundColor: '#1877F2',
        }}>
          <Image source={require('../../../assets/images/plus.png')}
            style={{ tintColor: '#FFFFFF', width: 24, height: 24, margin: 15 }}
          />
        </TouchableOpacity>
      </View>

  )
}

export default Profile

const styles = StyleSheet.create({

  leftSwipe: {
    marginRight: 10,
    backgroundColor: '#F1F2F3',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center'
  },

  rightSwipe: {
    backgroundColor: '#F1F2F3',
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center'
  },



  txtBtnEdit: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#FFFFFF',
  },
  btnEdit: {
    width: ((Dimensions.get('window').width - 48 - 16) / 2),
    height: 50,
    backgroundColor: '#1877F2',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },
  txtName: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
  },
  infomationContainer: {
    marginBottom: 16,
  },

  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  txtProfile: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
  },
  vTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  newsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 24,
  }
})