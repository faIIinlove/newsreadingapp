import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Detail from '../screens/Home/Detail';
import Home from '../screens/Home';
import Search from '../screens/Home/Search';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="HomePage" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    )
}

export default HomeStack
