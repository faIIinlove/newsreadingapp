import {
  StyleSheet,
} from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Setting from '../screens/Users/Profile/Setting';
import MainProfile from '../screens/Users/Profile';
import EditProfile from '../screens/Users/Profile/EditProfile';
import CreateNews from '../screens/Users/CreateNews';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainProfile} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CreateNews" component={CreateNews} />
    </Stack.Navigator>
  )
}

export default ProfileStack
