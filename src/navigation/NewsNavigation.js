import React, { useContext } from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import HomeStack from './HomeStack';
import Bookmark from '../screens/Home/Bookmark';
import ProfileStack from './ProfileStack';
import Explore from '../screens/Home/Explore';

function CustomTabBarIcon(route, color) {
  let icon = require('../assets/images/bottomnavigation_home.png')
  switch (route.name) {
    case 'Explore':
      icon = require('../assets/images/bottomnavigation_compass.png')
      break;
    case 'Bookmark':
      icon = require('../assets/images/bottomnavigation_bookmark.png')
      break;
    case 'Profile':
      icon = require('../assets/images/bottomnavigation_profile.png')
      break;
    default:
      break;
  }
  return <Image source={icon} tintColor={color} style={{ width: 20, height: 20 }} />;
}


const NewsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => CustomTabBarIcon(route, color)
      })}
    >
      <Tab.Screen name='Home' component={HomeStack} />
      <Tab.Screen name='Explore' component={Explore} />
      <Tab.Screen name='Bookmark' component={Bookmark} />
      <Tab.Screen name='Profile' component={ProfileStack} />
    </Tab.Navigator>
  )
}

export default NewsNavigation